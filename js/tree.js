"use strict";

// error message for Python exceptions
window.addEventListener("error", function (e) {
    if (e.error.name == "PythonError") {
        $('#error').modal('show');
    }
});

// override defaults for text editing with Jack textarea
document.getElementById('jackTextArea')
    .addEventListener('keydown', function(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = `${this.value.substring(0, start)}  ${this.value.substring(end)}`;
            this.selectionStart = this.selectionEnd = start + 2;
        }
    });


function makeTree(xmlStr) {
    // xmlStr to xmlDoc
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "application/xml");
    const errorNode = xmlDoc.querySelector('parsererror');

    if (errorNode) {
        console.log(errorNode)
    } else {
        console.log("DOMParser successfully parsed XML")
    }

    const width = document.getElementById("tree-canvas").offsetWidth;
    const height = document.getElementById("tree-canvas").offsetHeight;

    // const transform = d3.zoomIdentity.translate(width/3, 0).scale(0.5);
    const transform = d3.zoomIdentity;
    const zoom = d3.zoom().on("zoom", handleZoom);

    const svg = d3.select('svg');
    // clear existing svg
    svg.selectAll('*').remove();

    svg.call(zoom)
        .call(zoom.transform, transform);
    
    var g = svg
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr("transform", transform);
    
    function handleZoom(event) {
        if (g) {
            g.attr("transform", event.transform);
        }
    }

    const tree = d3.tree()
        .nodeSize([50, 100])
        .separation(function(a,b) { return a.parent == b.parent ? 2 : 3});
    const root = d3.hierarchy(xmlDoc);
    const links = tree(root).links();

    // links
    g.selectAll('path').data(links)
        .enter()
        .append('path')
        .attr('d', d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y)
        );

    const nodes = g.append('g')
        .selectAll('g')
        .data(root.descendants())
        .join('g');

    function getTextLength(d) {
        var tagNameLength = d.data.tagName.length;
        var innerHTMLLength = d.children ? 0 : d.data.innerHTML.length;
        return tagNameLength > innerHTMLLength ? tagNameLength*9 : innerHTMLLength*9;
    }

    function replaceEscaped(escapedStr) {
        return escapedStr
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g,'"')
            .replace(/&amp;/g, '&');
    }

    // surrounding rect
    nodes.append('rect')
        .attr('x', d => d.data.tagName ? d.x - getTextLength(d)/2 : d.x)
        .attr('y', d => d.y - 15)
        .attr('width', d => d.data.tagName ? getTextLength(d) : null)
        .attr('height', d => d.children ? 19 : 37)
        .attr('stroke', 'black')
        .attr('fill', 'white');

    // innerText rect
    nodes.append('rect')
        .attr('x', d => d.data.tagName ? d.x - getTextLength(d)/2+3: d.x)
        .attr('y', d => d.y + 3)
        .attr('width', d => d.data.tagName ? getTextLength(d)-6 : null)
        .attr('height', d => d.children ? 0 : 16)
        .attr('stroke', 'black')
        .attr('fill', 'white');

    // tagName text
    nodes.append('text')
        .style('font', '12px courier')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dy', '-0.2em')
        .attr("text-anchor", "middle")
        .text(d => d.data.tagName);

    // innerHTML text
    nodes.append('text')
        .style('font', '12px courier')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dy', '1.2em')
        .attr('text-anchor', 'middle')
        .text(d => d.children ? null : replaceEscaped(d.data.innerHTML));

    function animateInitialZoom() {
        console.log("attempting zoom animation...");

        // var bbox = g.node().getBBox();
        var bbox = g.node().getBoundingClientRect();

        var xScale = window.innerWidth / bbox.width;
        var yScale = window.innerHeight / bbox.height;

        // var zoomScale = (xScale + yScale)/2;
        var zoomScale = Math.min(xScale, yScale);

        var tx = (window.innerWidth - bbox.width*zoomScale)/2;
        var ty = (window.innerHeight - bbox.height*zoomScale)/2;

        svg.transition()
            .delay(200)
            .ease(d3.easeCubicInOut)
            .duration(1000)
            .call(
                zoom.transform,
                d3.zoomIdentity
                    .scale(zoomScale)
                    .translate(-bbox.x+tx, -bbox.y+ty)
            );
    }

    animateInitialZoom();
}

function getXmlStr() {
    var currentXmlStr = document.getElementById("xmlText").value;
    if (currentXmlStr != lastXmlStr) {
        makeTree(currentXmlStr);
        lastXmlStr = currentXmlStr;
    }
}

var lastXmlStr = ""; // initialize global xmlStr var
setInterval(getXmlStr, 500);
