class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        let curveOne = {p0: {x: this.canvas.width / 3, y: this.canvas.height / 3},
                        p1: {x: (this.canvas.width / 3) - 60, y: (this.canvas.width / 3) + 60},
                        p2: {x: ((2 * this.canvas.width) / 3) - 60, y: ((2 * this.canvas.height) / 3) + 60},
                        p3: {x: (2 * this.canvas.width) / 3, y: (2 * this.canvas.height) / 3}
                    };
        
        let curveTwo = {p0: {x: this.canvas.width / 5, y: this.canvas.height / 5},
                p1: {x: this.canvas.width / 2, y: this.canvas.width / 4},
                p2: {x: this.canvas.width - 200, y: this.canvas.height / 3},
                p3: {x: this.canvas.width - 50, y: this.canvas.height - 50}
            };

        this.drawBezierCurve(curveOne.p0, curveOne.p1, curveOne.p2, curveOne.p3, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
        this.drawBezierCurve(curveTwo.p0, curveTwo.p1, curveTwo.p2, curveTwo.p3, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        
        if (this.show_points)
        {
            // Draw squares to indicate control points but don't render their line vertices if enabled 
            this.drawVertexSquare(curveOne.p1, [0, 0, 0, 255], framebuffer);
            this.drawVertexSquare(curveOne.p2, [0, 0, 0, 255], framebuffer);
            this.drawVertexSquare(curveTwo.p1, [0, 0, 0, 255], framebuffer);
            this.drawVertexSquare(curveTwo.p2, [0, 0, 0, 255], framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        this.drawCircle({x: this.canvas.width / 3, y: this.canvas.height / 2}, 100, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
        this.drawCircle({x: 2*this.canvas.width / 3, y: this.canvas.height / 2}, 50, this.num_curve_sections, [0, 0, 255, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        let polygonOne = [
            {x: 100, y: 100},
            {x: 120, y: 120},
            {x: 135, y: 135},
            {x: 120, y: 140},
            {x: 100, y: 130},
            {x: 80,  y: 120}
        ];

        let polygonTwo = [
            {x: 153, y: 490},
            {x: 76, y: 386},
            {x: 110, y: 340},
            {x: 310, y: 128},
            {x: 392, y: 130},
            {x: 383, y: 289},
            {x: 351, y: 323},
            {x: 221, y: 453}
        ];

        this.drawConvexPolygon(polygonOne, [0, 255, 0, 255], framebuffer);
        this.drawConvexPolygon(polygonTwo, [128, 255, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // W
        this.drawLine({x: 100, y: 200}, {x: 120, y: 100}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 120, y: 100}, {x: 130, y: 150}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 130, y: 150}, {x: 140, y: 100}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 140, y: 100}, {x: 160, y: 200}, [0, 0, 0, 255], framebuffer);

        // i
        this.drawLine({x: 220, y: 100}, {x: 220, y: 150}, [0, 0, 0, 255], framebuffer);
        this.drawCircle({x: 220, y: 175}, 10, this.num_curve_sections, [0, 0, 0, 255], framebuffer, false);

        // l
        let firstL = [
            {x: 305, y: 100},
            {x: 315, y: 100},
            {x: 315, y: 200},
            {x: 305, y: 200}
        ]
        this.drawConvexPolygon(firstL, [0, 0, 0, 255], framebuffer);

        // l
        let secondL = [
            {x: 395, y: 100},
            {x: 405, y: 100},
            {x: 405, y: 200},
            {x: 395, y: 200}
        ]
        this.drawConvexPolygon(secondL, [0, 0, 0, 255], framebuffer);

        // i
        this.drawLine({x: 490, y: 100}, {x: 490, y: 150}, [0, 0, 0, 255], framebuffer);
        this.drawCircle({x: 490, y: 175}, 10, this.num_curve_sections, [0, 0, 0, 255], framebuffer, false);

        // a
        this.drawLine({x: 550, y: 150}, {x: 610, y: 150}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 610, y: 150}, {x: 610, y: 125}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 610, y: 125}, {x: 550, y: 125}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 550, y: 125}, {x: 550, y: 100}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 550, y: 100}, {x: 610, y: 100}, [0, 0, 0, 255], framebuffer);
        this.drawLine({x: 610, y: 100}, {x: 610, y: 125}, [0, 0, 0, 255], framebuffer);
        
        // m
        this.drawLine({x: 640, y: 100}, {x: 640, y: 150}, [0, 0, 0, 255], framebuffer);
        this.drawBezierCurve({x: 640, y: 100}, {x: 640, y: 160}, {x: 670, y: 160}, {x: 670, y: 100}, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
        this.drawBezierCurve({x: 670, y: 100}, {x: 670, y: 160}, {x: 700, y: 160}, {x: 700, y: 100}, this.num_curve_sections, [0, 0, 0, 255], framebuffer);

        // Render all point indicators for lines, all other shapes implement it for us
        if (this.show_points)
        {   
            // W
            this.drawVertex({x: 100, y: 200}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 120, y: 100}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 130, y: 150}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 140, y: 100}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 160, y: 200}, [0, 0, 0, 255], framebuffer);

            // i # 1
            this.drawVertex({x: 220, y: 100}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 220, y: 150}, [0, 0, 0, 255], framebuffer);

            // i # 2
            this.drawVertex({x: 490, y: 100}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 490, y: 150}, [0, 0, 0, 255], framebuffer);

            // a
            this.drawVertex({x: 550, y: 150}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 610, y: 150}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 610, y: 125}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 550, y: 125}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 550, y: 100}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 610, y: 100}, [0, 0, 0, 255], framebuffer);

            // m
            this.drawVertex({x: 640, y: 100}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 640, y: 150}, [0, 0, 0, 255], framebuffer);
        } 
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // Calculate t increment for each new vertex based on number of edges (t=0 -> t=1)
        let pointIncrement = 1.0 / num_edges;
        
        // Compute all vertices on curve, the total number of vertices being the # of line segments + 1
        let vertices = [];
        for (let i = 0; i < num_edges + 1; i++)
        {
            let t = pointIncrement * i;
            let x = Math.floor(((1 - t)**3 * p0.x) + (3 * (1 - t)**2 * t * p1.x) + (3 * (1 - t) * t**2 * p2.x) + (t**3 * p3.x));
            let y = Math.floor(((1 - t)**3 * p0.y) + (3 * (1 - t)**2 * t * p1.y) + (3 * (1 - t) * t**2 * p2.y) + (t**3 * p3.y));
            vertices.push({x: x, y: y});
        }

        // Render all line segments and vertex markings of the curve
        for (let i = 0; i < num_edges; i++) this.drawLine(vertices[i], vertices[i + 1], color, framebuffer);
        if (this.show_points) for (let i = 0; i <= num_edges; i++) this.drawVertex(vertices[i], [0, 0, 0, 255], framebuffer);
    }

    // center:              object {x: __, y: __}
    // radius:              int
    // num_edges:           int
    // color:               array of int [R, G, B, A]
    // framebuffer:         canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // Calculate the radian increment for each new vertex on the circle from 0 -> 2pi
        let radianStep = (2 * Math.PI) / num_edges;

        // Compute all vertices of the n-sided polygon
        let vertices = [];
        for (let i = 0; i < num_edges + 1; i++)
        {
            let x = Math.floor(center.x + radius * Math.cos(i * radianStep));
            let y = Math.floor(center.y + radius * Math.sin(i * radianStep));
            vertices.push({x: x, y: y});
        }

        // Render all the line segments of the n-sided polygon
        for (let i = 0; i < num_edges; i++) this.drawLine(vertices[i], vertices[i + 1], color, framebuffer);

        // Render all the vertex markings only if we are not ignoring them for the bexier curve control points
        if (this.show_points) for (let i = 0; i < num_edges; i++) this.drawVertex(vertices[i], [0, 0, 0, 255], framebuffer);
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // Render all the filled triangles to create the convex polygon
        // The total number of triangles is the number of vertexes - 2 with the -2 accounting for the initial triangle and the zeroth vertex
        for (let i = 1; i < vertex_list.length - 1; i++) this.drawTriangle(vertex_list[0], vertex_list[i], vertex_list[i + 1], color, framebuffer);

        // Render the vertex markings
        if (this.show_points) for (let i = 0; i < vertex_list.length; i++) this.drawVertex(vertex_list[i], [0, 0, 0, 255], framebuffer);
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // Draw two lines to emulate an X around the provided vertex
        this.drawLine({x: Math.floor(v.x - 5), y: Math.floor(v.y + 5)}, {x: Math.floor(v.x + 5), y: Math.floor(v.y - 5)}, color, framebuffer);
        this.drawLine({x: Math.floor(v.x + 5), y: Math.floor(v.y + 5)}, {x: Math.floor(v.x - 5), y: Math.floor(v.y - 5)}, color, framebuffer);
    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertexSquare(v, color, framebuffer) {
        // Draw four lines to emulate a square around the provided vertex
        this.drawLine({x: Math.floor(v.x - 5), y: Math.floor(v.y + 5)}, {x: Math.floor(v.x + 5), y: Math.floor(v.y + 5)}, color, framebuffer);
        this.drawLine({x: Math.floor(v.x - 5), y: Math.floor(v.y + 5)}, {x: Math.floor(v.x - 5), y: Math.floor(v.y - 5)}, color, framebuffer);
        this.drawLine({x: Math.floor(v.x - 5), y: Math.floor(v.y - 5)}, {x: Math.floor(v.x + 5), y: Math.floor(v.y - 5)}, color, framebuffer);
        this.drawLine({x: Math.floor(v.x + 5), y: Math.floor(v.y + 5)}, {x: Math.floor(v.x + 5), y: Math.floor(v.y - 5)}, color, framebuffer);
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
