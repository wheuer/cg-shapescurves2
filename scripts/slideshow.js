const { createApp } = Vue;

let app;

function init() {
    app = createApp({
        data() {
            return {
                view: {
                    id: 'view',
                    width: 800,
                    height: 600
                },
                renderer: {},
                slide_description: [
                    "Bezier Curves",
                    "Circles",
                    "Convex Polygons",
                    "Name"
                ],
                slide_idx: 0,
                curve_sections: 12,
                show_points: false
            }
        },
        watch: {
            curve_sections(new_value, old_value) {
                this.renderer.setNumCurveSections(parseInt(new_value));
            },
            show_points(new_value, old_value) {
                this.renderer.showPoints(new_value);
            }
        },
        methods: {
            prevSlide() {
                if (this.slide_idx > 0) {
                    this.slide_idx -= 1;
                    this.renderer.drawSlide(this.slide_idx);
                }
            },
            
            nextSlide() {
                if (this.slide_idx < this.slide_description.length - 1) {
                    this.slide_idx += 1;
                    this.renderer.drawSlide(this.slide_idx);
                }
            }
        }
    }).mount('#content');
    
    app.renderer = new Renderer(app.view, app.curve_sections, app.show_points);
    app.renderer.drawSlide(app.slide_idx);
}
