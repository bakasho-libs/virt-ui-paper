var virt = require("@nathanfaucett/virt"),
    propTypes = require("@nathanfaucett/prop_types"),
    css = require("@nathanfaucett/css"),
    extend = require("@nathanfaucett/extend");


var PaperPrototype;


module.exports = Paper;


function Paper(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(Paper, "virt-ui-Paper");

Paper.contextTypes = {
    muiTheme: propTypes.implement({
        fontFamily: propTypes.string,
        palette: propTypes.implement({
            level3Color: propTypes.string
        }).isRequired
    }).isRequired
};

Paper.propTypes = {
    color: propTypes.string,
    circle: propTypes.bool,
    rounded: propTypes.bool,
    transitionEnabled: propTypes.bool,
    zDepth: propTypes.oneOf([0, 1, 2, 3, 4, 5])
};

Paper.defaultProps = {
    rounded: true,
    zDepth: 1,
    transitionEnabled: true
};

PaperPrototype = Paper.prototype;

var Z_DEPTH_SHADOWS = [
    "",
    "0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)",
    "0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)",
    "0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)",
    "0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)",
    "0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22)"
];

PaperPrototype.getStyles = function() {
    var props = this.props,
        zDepth = props.zDepth,
        styles = {
            root: {
                backgroundColor: props.color || this.context.muiTheme.palette.level3Color,
                fontFamily: this.context.muiTheme.fontFamily,
                WebkitTapHighlightColor: "rgba(0,0,0,0)"
            }
        };

    if (props.transitionEnabled) {
        css.transition(styles.root, "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms");
    }
    if (zDepth > 0 && zDepth < 6) {
        css.boxShadow(styles.root, Z_DEPTH_SHADOWS[zDepth]);
    }

    css.boxSizing(styles.root, "border-box");
    css.borderRadius(styles.root, props.circle ? "50%" : (props.rounded ? "2px" : "0px"));

    return styles;
};

PaperPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "virt-ui-Paper",
                style: extend(styles.root, this.props.style)
            },
            this.children
        )
    );
};
