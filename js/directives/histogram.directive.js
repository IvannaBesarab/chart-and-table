 (function(){
	'use strict';

	angular
		.module('app')
		.directive('historgram', histogramDirective);

	histogramDirective.$inject = [];

	function histogramDirective(){

		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '='
			},
			template: '<svg id="chart"></svg>',
			link: function (scope, element, attr){

				var margin = {top: 15, right: 20, bottom: 30, left: 30};
				var height =  attr.height ? (+attr.height) : 300;
				var width  =  attr.width  ? (+attr.width)  : 300;
				var barWidth, x, y, xAxis, yAxis;

				function drawHistogram(data){
					if(!data) return;
					setHistogramParameters(data);

					d3.select('#chart')
							.attr("width", width + margin.left  +  margin.right )
							.attr("height", height + margin.top  +  margin.bottom )
						.append('g')
							.attr('class', 'bars');

					d3.select('g.bars')
							.attr('transform','translate('+ margin.left +', '+ margin.top +')')
						.selectAll('rect').
							data(data).enter()
							.append('rect')
								.attr('x', function(d, i){return x(d.sprint);})
								.attr('width', barWidth - 2)
								.attr('y', function(d){return y(d.storyPoints);})
								.attr('height', function(d){return height - y(d.storyPoints);});

					d3.select('svg')
						.append('g')
							.attr('class','bottom-line')
						.call(xAxis);

					d3.select('svg')
						.append('g')
							.attr('class','left-line')
						.call(yAxis);

					d3.select('svg')
						.append("text")
							.attr("x", width / 2 )
							.attr('transform','translate(0, 5)')
							.attr("y", margin.top)
							.attr("text-anchor", "middle")
							.style("font-size", "16px")
							.text("Story Points Statistic");

					d3.selectAll('path, line')
						.style({fill: 'none', stroke: 'rgb(10, 10, 10)', 'shape-rendering':'crispEdges'});

					d3.selectAll('g.left-line')
							.attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

					d3.selectAll('g.bottom-line')
							.attr('transform', 'translate('+ margin.left +', '+ (height + margin.top) +')')
				}

				function redrawHistogram(data){
					setHistogramParameters(data);

					d3.selectAll('svg g.bottom-line').call(xAxis);
					d3.selectAll('svg g.left-line').call(yAxis);
					d3.selectAll('rect').remove();
					d3.select('g.bars')
						.selectAll('rect').data(data).enter()
								.append('rect')
									.attr('x', function(d, i){return x(d.sprint);})
									.attr('width', barWidth - 2)
									.attr('y', function(d){return y(d.storyPoints);})
									.attr('height', function(d){return height - y(d.storyPoints);});
				}

				function setHistogramParameters(data){
					barWidth = width / data.length;
					x = d3.scale.ordinal()
							.domain(data.map(function(d) {return d.sprint;}))
							.rangeRoundBands([0, width]);

					y = d3.scale.linear()
							.domain([0, d3.max(data, function(d){return d.storyPoints + 10; })])
							.range([height, 0]);

					xAxis = d3.svg.axis()
							.scale(x)
							.orient('bottom');

					yAxis = d3.svg.axis()
							.scale(y)
							.ticks(data.length)
							.orient('left');
				}

				scope.$watchCollection('data', function (newVal, oldVal) {
					if (newVal === oldVal) return;

					if (oldVal === undefined){
						drawHistogram(newVal);
					} else {
						redrawHistogram(newVal);
					}

				}, true);
			}
		}
	}
 })();
