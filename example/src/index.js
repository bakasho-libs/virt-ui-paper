var virt = require("virt"),
    virtDOM = require("virt-dom"),
    Paper = require("../..");


var AppPrototype;


function App(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

AppPrototype.getChildContext = function() {
    return {
        muiTheme: {
            styles: {
                paper: {
                    backgroundColor: "#fff"
                }
            }
        }
    };
};

AppPrototype.render = function() {
    var spacing = {
        margin: "32px",
        padding: "8px 16px"
    };

    return (
        virt.createView("div", {
                className: "App"
            },
            virt.createView(Paper, {
                zDepth: 0,
                style: spacing
            }, "Depth 0"),
            virt.createView(Paper, {
                zDepth: 1,
                style: spacing
            }, "Depth 1"),
            virt.createView(Paper, {
                zDepth: 2,
                style: spacing
            }, "Depth 2"),
            virt.createView(Paper, {
                zDepth: 3,
                style: spacing
            }, "Depth 3"),
            virt.createView(Paper, {
                zDepth: 4,
                style: spacing
            }, "Depth 4"),
            virt.createView(Paper, {
                zDepth: 5,
                style: spacing
            }, "Depth 5")
        )
    );
};

virtDOM.render(virt.createView(App), document.getElementById("app"));
