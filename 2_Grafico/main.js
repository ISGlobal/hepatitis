var lang = getParameterByName('lang');
if (lang != null && lang != "") {
    //set the locale in which the messages will be translated
    iJS.i18n.setlocale(lang);
    //add domain where to find messages data
    iJS.i18n.bindtextdomain(lang, "../locale", "po");
    //Always do this after a `setlocale` or a `bindtextdomain` call.
    iJS.i18n.try_load_lang(); //will load and parse messages data from the setting catalog.
}


var data = [{
    type: iJS._("Países con ingresos bajos"),
    value: 12
}, {
    type: iJS._("Países con ingresos medios"),
    value: 14
}, {
    type: iJS._("Países con ingresos altos"),
    value: 74
}, ];

var width = 960,
    height = 500,
    title = 40,
    source = 40,
    radius = Math.min(width, height - title - source) / 2;

var color = d3.scale.ordinal()
    .range(["#af9959", "#d7ae1c", "#f59c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 100);

var pie = d3.layout.pie()
    .sort(null)
    .startAngle(1.1 * Math.PI)
    .endAngle(3.1 * Math.PI)
    .value(function(d) {
        return d.value;
    });

var container = d3.select("body").append("div")
    .classed("svg-container", true)


var svg = container.append("svg")
    .attr("viewBox", function() {
        return [0, 0, width, height].join(" ")
    })
    .attr("preserveAspectRatio", "xMinYMin meet")
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + 20 + ")")
    .append('text')
    .attr("text-anchor", "middle")
    .attr("font-weight", "700")
    .attr("font-size", "18")
    .text(iJS._("Incidencia de la hepatitis C"))
    .select(function() {
        return this.parentNode;
    })
    .select(function() {
        return this.parentNode;
    })
    .append("g")
    .attr("transform", "translate(" + (width - 10) + "," + (height - 5) + ")")
    .append('text')
    .attr("text-anchor", "end")
    .attr("font-weight", "300")
    .attr("font-size", "10")
    .attr("font-style", "italic")
    .text(iJS._("Fuente: ISGlobal. 2016. Hepatitis C: el nuevo campo de batalla por el acceso a medicamentos esenciales. Informe 25, serie \"Innovación y acceso\"."))
    .select(function() {
        return this.parentNode;
    })
    .select(function() {
        return this.parentNode;
    })
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + ((height / 2) + 20) + ")");

var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

g.append("path")
    .attr("data-type", function(d) {
        return d.data.type
    })
    .style("fill", function(d) {
        return color(d.data.type);
    })

.transition().delay(function(d, i) {
    return i * 750;
}).duration(750)

.attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function(t) {
            d.endAngle = i(t);
            return arc(d);
        }
    })
    .call(endall, function() {
        console.log("all done")
        d3.selectAll("[data-type]")
            .on('mouseover', highlight)
            .on('mouseout', unhighlight)
    });



g.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .attr("opacity", 0)
    .attr("font-weight", "700")
    .attr("data-type", function(d) {
        return d.data.type
    })
    .text(function(d) {
        return d.data.value + "%";
    })
    .transition().delay(function(d, i) {
        return i * 750;
    }).duration(750)
    .attr("opacity", 1);

var legendRectSize = 18;
var legendSpacing = 4;

var legend = svg.selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * data.length / 2;
        var horz = (-6 * legendRectSize) - 342;
        var vert = i * height - offset + 200;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .attr("data-type", function(d) {
        return d.type
    })
    .style('fill', function(d) {
        return color(d.type);
    })
    .style('stroke', function(d) {
        return color(d.type);
    });
legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .attr("data-type", function(d) {
        return d.type
    })
    .text(function(d) {
        console.log(d);
        return d.type;
    });


function type(d) {
    d.value = +d.value;
    return d;
}

function highlight() {
    var c = d3.select(this).attr("data-type");
    d3.selectAll(".arc path:not([data-type='" + c + "'])").transition().duration(250).attr('opacity', .5)
    d3.selectAll(".legend rect:not([data-type='" + c + "'])").transition().duration(250).attr('opacity', .5)
    d3.selectAll(".legend text:not([data-type='" + c + "'])").transition().duration(250).attr('opacity', .5)
}

function unhighlight() {
    var c = d3.select(this).attr("data-type");
    d3.selectAll(".arc path:not([data-type='" + c + "'])").transition().duration(250).attr('opacity', 1)
    d3.selectAll(".legend rect:not([data-type='" + c + "'])").transition().duration(250).attr('opacity', 1)
    d3.selectAll(".legend text:not([data-type='" + c + "'])").transition().duration(250).attr('opacity', 1)
}


function endall(transition, callback) {
    if (transition.size() === 0) {
        callback()
    }
    var n = 0;
    transition
        .each(function() {
            ++n;
        })
        .each("end", function() {
            if (!--n) callback.apply(this, arguments);
        });
}
