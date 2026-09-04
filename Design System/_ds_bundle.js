/* @ds-bundle: {"format":4,"namespace":"AlinaMartNezDesignSystem_f6c15e","components":[{"name":"FigureIllustration","sourcePath":"components/brand/FigureIllustration.jsx"},{"name":"PhotoOverlay","sourcePath":"components/brand/PhotoOverlay.jsx"},{"name":"QuoteBlock","sourcePath":"components/brand/QuoteBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Highlight","sourcePath":"components/core/Highlight.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"CarouselPost","sourcePath":"ui_kits/social/CarouselPost.jsx"},{"name":"IllustrationPost","sourcePath":"ui_kits/social/IllustrationPost.jsx"},{"name":"PhotoAdPost","sourcePath":"ui_kits/social/PhotoAdPost.jsx"},{"name":"QuotePost","sourcePath":"ui_kits/social/QuotePost.jsx"},{"name":"About","sourcePath":"ui_kits/website/About.jsx"},{"name":"Contact","sourcePath":"ui_kits/website/Contact.jsx"},{"name":"Hero","sourcePath":"ui_kits/website/Hero.jsx"},{"name":"Sessions","sourcePath":"ui_kits/website/Sessions.jsx"},{"name":"SiteFooter","sourcePath":"ui_kits/website/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"ui_kits/website/SiteHeader.jsx"}],"sourceHashes":{"components/brand/FigureIllustration.jsx":"e2ac83ec6910","components/brand/PhotoOverlay.jsx":"50b1142b06e1","components/brand/QuoteBlock.jsx":"1fc915092673","components/core/Badge.jsx":"18c89f69689f","components/core/Button.jsx":"7274602c27e8","components/core/Card.jsx":"18c51d68d2fd","components/core/Divider.jsx":"dc5026fa6c67","components/core/Highlight.jsx":"1d188e7c801e","components/core/Icon.jsx":"bfe43fbfc209","components/core/IconButton.jsx":"8f9fb89048bb","components/core/Logo.jsx":"0ad6bdb8056f","components/core/Tag.jsx":"610bfd4f28cd","components/feedback/Dialog.jsx":"1aff94279465","components/feedback/Toast.jsx":"a4756e33a1f0","components/feedback/Tooltip.jsx":"3ddfc3c39c82","components/forms/Checkbox.jsx":"625da144bd22","components/forms/Field.jsx":"b997afcd5c7c","components/forms/Input.jsx":"eef3f5c87c1f","components/forms/Radio.jsx":"f45aad9da195","components/forms/Select.jsx":"c5e4506dbff9","components/forms/Switch.jsx":"98693386c269","components/forms/Textarea.jsx":"686708995f1b","components/navigation/Accordion.jsx":"c4d356b52911","components/navigation/Tabs.jsx":"9cda99841294","ui_kits/social/CarouselPost.jsx":"be3ddd251fbe","ui_kits/social/IllustrationPost.jsx":"28b68c186e0d","ui_kits/social/PhotoAdPost.jsx":"d4dc2abdddef","ui_kits/social/QuotePost.jsx":"09e253ed28f7","ui_kits/website/About.jsx":"b902be824f53","ui_kits/website/Contact.jsx":"f536cabb4c69","ui_kits/website/Hero.jsx":"3e7dc0248b20","ui_kits/website/Sessions.jsx":"da2a6dae5418","ui_kits/website/SiteFooter.jsx":"0fcd82b77973","ui_kits/website/SiteHeader.jsx":"8a66eedd2308"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlinaMartNezDesignSystem_f6c15e = window.AlinaMartNezDesignSystem_f6c15e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/FigureIllustration.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  point: "alina-figure-point.png",
  arms: "alina-figure-arms.png"
};

/** Packaged line-art figure standing on the brand's hairline ground rule. */
function FigureIllustration({
  pose = "arms",
  height = 340,
  ground = true,
  base = "assets/illustrations/",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      ...style
    }
  }, rest), ground && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: "14%",
      borderTop: "1px solid var(--border-hairline)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: base + SRC[pose],
    alt: "",
    style: {
      height,
      width: "auto",
      position: "relative",
      mixBlendMode: "multiply"
    }
  }));
}
Object.assign(__ds_scope, { FigureIllustration });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/FigureIllustration.jsx", error: String((e && e.message) || e) }); }

// components/brand/PhotoOverlay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Photo with the brand's stacked marker-capsule headline, as used in the sales campaign. */
function PhotoOverlay({
  src,
  alt = "",
  lines = [],
  footnote,
  cta,
  ratio = "4 / 5",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      aspectRatio: ratio,
      overflow: "hidden",
      background: "var(--surface-mist)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "6%",
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: "var(--butter-400)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "clamp(18px,3.6cqw,34px)",
      padding: "6px 16px",
      lineHeight: 1.18
    }
  }, l))), (footnote || cta) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "7%",
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, footnote && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "clamp(13px,2.2cqw,20px)",
      padding: "6px 14px",
      textAlign: "center",
      lineHeight: 1.3
    }
  }, footnote), cta && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--white)",
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "clamp(15px,2.6cqw,24px)",
      padding: "8px 22px",
      border: "1px solid var(--butter-400)"
    }
  }, cta)));
}
Object.assign(__ds_scope, { PhotoOverlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PhotoOverlay.jsx", error: String((e && e.message) || e) }); }

// components/brand/QuoteBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The brand's most-used social layout: a butter field, the lockup, and a light quote. */
function QuoteBlock({
  tone = "butter",
  align = "center",
  eyebrow,
  children,
  footer,
  style,
  ...rest
}) {
  const bg = {
    butter: "var(--butter-400)",
    paper: "var(--surface-page)",
    lilac: "var(--surface-lilac)",
    mist: "var(--surface-mist)"
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      padding: "var(--space-8) var(--space-7)",
      textAlign: align,
      fontFamily: "var(--font-core)",
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-widest)",
      textTransform: "lowercase",
      color: "var(--text-secondary)",
      margin: "0 0 var(--space-5)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-quote)",
      color: "var(--text-primary)",
      margin: 0,
      textWrap: "pretty",
      maxWidth: "20ch",
      marginLeft: align === "center" ? "auto" : 0,
      marginRight: align === "center" ? "auto" : 0
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, footer));
}
Object.assign(__ds_scope, { QuoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/QuoteBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = "butter",
  style,
  children,
  ...rest
}) {
  const tones = {
    butter: {
      background: "var(--butter-400)",
      color: "var(--ink-900)"
    },
    lilac: {
      background: "var(--lilac-200)",
      color: "var(--ink-900)"
    },
    blush: {
      background: "var(--blush-300)",
      color: "var(--ink-900)"
    },
    sage: {
      background: "var(--sage-300)",
      color: "var(--ink-900)"
    },
    ink: {
      background: "var(--ink-900)",
      color: "var(--white)"
    },
    outline: {
      background: "transparent",
      color: "var(--ink-900)",
      border: "1px solid var(--ink-900)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-tag)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "lowercase",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      display: "inline-block",
      lineHeight: 1.2,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: "var(--font-core)",
  fontWeight: "var(--weight-medium)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  border: "1px solid transparent",
  borderRadius: "var(--radius-pill)",
  cursor: "pointer",
  textDecoration: "none",
  lineHeight: 1,
  transition: "var(--transition-base)",
  whiteSpace: "nowrap"
};
const sizes = {
  sm: {
    fontSize: "var(--text-sm)",
    padding: "9px 18px"
  },
  md: {
    fontSize: "var(--text-body)",
    padding: "13px 26px"
  },
  lg: {
    fontSize: "var(--text-lg)",
    padding: "17px 34px"
  }
};
const variants = {
  primary: {
    background: "var(--butter-400)",
    color: "var(--text-on-brand)"
  },
  secondary: {
    background: "transparent",
    color: "var(--text-primary)",
    borderColor: "var(--ink-900)"
  },
  lilac: {
    background: "var(--lilac-200)",
    color: "var(--text-primary)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)"
  },
  inverse: {
    background: "var(--ink-900)",
    color: "var(--text-inverse)"
  }
};
const hovers = {
  primary: {
    background: "var(--butter-300)"
  },
  secondary: {
    background: "var(--butter-100)"
  },
  lilac: {
    background: "var(--lilac-100)"
  },
  ghost: {
    background: "var(--butter-100)"
  },
  inverse: {
    background: "var(--ink-700)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  as = "button",
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: as === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...(hover && !disabled ? hovers[variant] : null),
      transform: press && !disabled ? "var(--press-scale)" : "none",
      opacity: disabled ? .4 : 1,
      pointerEvents: disabled ? "none" : "auto",
      width: fullWidth ? "100%" : "auto",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  tone = "paper",
  bordered = false,
  padding = "var(--space-6)",
  style,
  children,
  ...rest
}) {
  const tones = {
    paper: {
      background: "var(--surface-card)"
    },
    butter: {
      background: "var(--butter-400)"
    },
    butterSoft: {
      background: "var(--butter-100)"
    },
    lilac: {
      background: "var(--surface-lilac)"
    },
    mist: {
      background: "var(--surface-mist)"
    },
    ink: {
      background: "var(--surface-inverse)",
      color: "var(--text-inverse)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: "var(--shadow-none)",
      border: bordered ? "1px solid var(--ink-900)" : "1px solid transparent",
      fontFamily: "var(--font-core)",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The hairline rule the illustrations stand on — a signature brand device. */
function Divider({
  tone = "ink",
  spacing = "var(--space-6)",
  style,
  ...rest
}) {
  const color = {
    ink: "var(--ink-900)",
    subtle: "var(--border-subtle)",
    lilac: "var(--lilac-300)"
  }[tone];
  return /*#__PURE__*/React.createElement("hr", _extends({
    style: {
      border: 0,
      borderTop: "1px solid " + color,
      margin: spacing + " 0",
      width: "100%",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Highlight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The marker capsule / brush stroke used behind headline words across the brand's social work. */
function Highlight({
  tone = "butter",
  style,
  children,
  ...rest
}) {
  const tones = {
    butter: {
      background: "var(--butter-400)"
    },
    lilac: {
      background: "var(--accent-brush)"
    },
    blush: {
      background: "var(--blush-300)"
    },
    white: {
      background: "var(--white)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      background: tones[tone].background,
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
      padding: "0.06em 0.3em 0.14em",
      color: "var(--text-primary)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Highlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Highlight.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thin line icons. The brand ships no icon set of its own, so this wraps Lucide
 * (CDN, stroke-based) tuned to the illustration line weight. Flagged substitution — see readme.md.
 */
function Icon({
  name,
  size = 22,
  stroke = 1.75,
  color = "currentColor",
  style,
  ...rest
}) {
  const src = "https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/" + name + ".svg";
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    width: size,
    height: size,
    alt: "",
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      filter: color === "var(--white)" || color === "#fff" ? "invert(1)" : "none",
      opacity: 1,
      strokeWidth: stroke,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  size = "md",
  variant = "secondary",
  label,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = {
    sm: 32,
    md: 40,
    lg: 48
  }[size];
  const skin = {
    primary: {
      background: "var(--butter-400)",
      borderColor: "transparent"
    },
    secondary: {
      background: "transparent",
      borderColor: "var(--ink-900)"
    },
    ghost: {
      background: "transparent",
      borderColor: "transparent"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dim,
      height: dim,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid",
      borderRadius: "var(--radius-circle)",
      cursor: "pointer",
      color: "var(--text-primary)",
      transition: "var(--transition-base)",
      ...skin,
      background: hover ? "var(--butter-100)" : skin.background,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  primary: "alina-logo.svg",
  // full colour lockup (vector)
  byn: "alina-logo-byn.svg",
  // one-colour / black & white lockup
  white: "logo-white.png",
  // knockout lockup for dark fields
  isoAmarillo: "alina-iso-amarillo.svg",
  isoMorado: "alina-iso-morado.svg",
  isoGris: "alina-iso-gris.svg"
};

/** Renders the packaged logo files from assets/logos — never redraw the mark. */
function Logo({
  variant = "primary",
  height = 88,
  base = "assets/logos/",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: base + (SRC[variant] || SRC.primary),
    alt: "alina mart\xEDnez \u2014 existir consciente",
    style: {
      height,
      width: "auto",
      display: "block",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  selected = false,
  onRemove,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-light)",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--ink-900)",
      background: selected ? "var(--butter-400)" : "transparent",
      color: "var(--text-primary)",
      cursor: "pointer",
      transition: "var(--transition-base)",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      fontSize: "var(--text-xs)",
      opacity: .6,
      cursor: "pointer"
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  onClose,
  footer,
  children,
  width = 520,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "var(--overlay-scrim)",
      backdropFilter: "var(--blur-veil)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-5)",
      zIndex: 50
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-overlay)",
      width,
      maxWidth: "100%",
      padding: "var(--space-6)",
      fontFamily: "var(--font-core)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "var(--space-4)"
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-h3)"
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      border: 0,
      background: "transparent",
      fontSize: 18,
      cursor: "pointer",
      lineHeight: 1,
      color: "var(--text-secondary)"
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)",
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)",
      display: "flex",
      gap: "var(--space-3)",
      justifyContent: "flex-end"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  tone = "success",
  message,
  onClose,
  style,
  ...rest
}) {
  const tones = {
    success: "var(--sage-300)",
    info: "var(--lilac-200)",
    warning: "var(--butter-400)",
    error: "var(--blush-300)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-4)",
      background: tones[tone],
      color: "var(--text-primary)",
      padding: "14px 18px",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-sm)",
      boxShadow: "var(--shadow-soft)",
      ...style
    }
  }, rest), message, onClose && /*#__PURE__*/React.createElement("span", {
    onClick: onClose,
    style: {
      cursor: "pointer",
      opacity: .55
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  label,
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--ink-900)",
      color: "var(--white)",
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-xs)",
      padding: "6px 10px",
      borderRadius: "var(--radius-xs)",
      whiteSpace: "nowrap",
      ...style
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-body)",
      fontWeight: "var(--weight-light)",
      color: "var(--text-body)",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? .4 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flex: "0 0 22px",
      borderRadius: "var(--radius-xs)",
      border: "1px solid var(--ink-900)",
      background: checked ? "var(--butter-400)" : "var(--white)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "var(--transition-base)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 6,
      borderLeft: "2px solid var(--ink-900)",
      borderBottom: "2px solid var(--ink-900)",
      transform: "rotate(-45deg) translateY(-1px)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Label + hint + error scaffold shared by the form controls. */
function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      fontFamily: "var(--font-core)",
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-secondary)"
    }
  }, label), children, (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-light)",
      color: error ? "var(--state-error)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...{
        fontFamily: "var(--font-core)",
        fontSize: "var(--text-body)",
        fontWeight: "var(--weight-light)",
        color: "var(--text-body)",
        background: "var(--white)",
        border: "1px solid var(--gray-300)",
        borderRadius: "var(--radius-sm)",
        padding: "13px 16px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        transition: "var(--transition-base)"
      },
      borderColor: invalid ? "var(--state-error)" : focus ? "var(--lilac-400)" : "var(--gray-300)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  checked = false,
  onChange,
  label,
  name,
  value,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-body)",
      fontWeight: "var(--weight-light)",
      color: "var(--text-body)",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? .4 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flex: "0 0 22px",
      borderRadius: "var(--radius-circle)",
      border: "1px solid var(--ink-900)",
      background: "var(--white)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "var(--radius-circle)",
      background: "var(--lilac-400)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...{
        fontFamily: "var(--font-core)",
        fontSize: "var(--text-body)",
        fontWeight: "var(--weight-light)",
        color: "var(--text-body)",
        background: "var(--white)",
        border: "1px solid var(--gray-300)",
        borderRadius: "var(--radius-sm)",
        padding: "13px 16px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        transition: "var(--transition-base)"
      },
      appearance: "none",
      cursor: "pointer",
      backgroundImage: "linear-gradient(45deg,transparent 50%,var(--ink-600) 50%),linear-gradient(135deg,var(--ink-600) 50%,transparent 50%)",
      backgroundPosition: "calc(100% - 20px) 50%,calc(100% - 14px) 50%",
      backgroundSize: "6px 6px,6px 6px",
      backgroundRepeat: "no-repeat",
      borderColor: focus ? "var(--lilac-400)" : "var(--gray-300)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      ...style
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      fontFamily: "var(--font-core)",
      fontSize: "var(--text-body)",
      fontWeight: "var(--weight-light)",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? .4 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 46,
      height: 26,
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--ink-900)",
      background: checked ? "var(--butter-400)" : "var(--white)",
      position: "relative",
      transition: "var(--transition-base)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 23 : 3,
      width: 18,
      height: 18,
      borderRadius: "var(--radius-circle)",
      background: "var(--ink-900)",
      transition: "left var(--duration-base) var(--ease-out-soft)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  rows = 4,
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...{
        fontFamily: "var(--font-core)",
        fontSize: "var(--text-body)",
        fontWeight: "var(--weight-light)",
        color: "var(--text-body)",
        background: "var(--white)",
        border: "1px solid var(--gray-300)",
        borderRadius: "var(--radius-sm)",
        padding: "13px 16px",
        width: "100%",
        boxSizing: "border-box",
        outline: "none",
        transition: "var(--transition-base)"
      },
      lineHeight: "var(--leading-normal)",
      resize: "vertical",
      borderColor: invalid ? "var(--state-error)" : focus ? "var(--lilac-400)" : "var(--gray-300)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Accordion({
  items = [],
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-core)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const on = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(on ? null : i),
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-4)",
        background: "transparent",
        border: 0,
        cursor: "pointer",
        padding: "20px 0",
        textAlign: "left",
        fontSize: "var(--text-lg)",
        fontWeight: "var(--weight-medium)",
        color: "var(--text-primary)"
      }
    }, it.question, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: "var(--weight-light)",
        transform: on ? "rotate(45deg)" : "none",
        transition: "var(--transition-base)"
      }
    }, "+")), on && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "0 0 22px",
        maxWidth: "var(--measure)",
        font: "var(--type-body)",
        color: "var(--text-body)"
      }
    }, it.answer));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const active = value ?? items[0]?.value;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "var(--space-2)",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        border: 0,
        background: "transparent",
        cursor: "pointer",
        fontFamily: "var(--font-core)",
        fontSize: "var(--text-body)",
        fontWeight: on ? "var(--weight-medium)" : "var(--weight-light)",
        color: on ? "var(--text-primary)" : "var(--text-secondary)",
        padding: "12px 4px",
        marginBottom: -1,
        borderBottom: "2px solid " + (on ? "var(--ink-900)" : "transparent"),
        transition: "var(--transition-base)"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/CarouselPost.jsx
try { (() => {
/** 1080×1350 opening slide for a carousel: title inside a drawn arc, quotes floating around it. */
function CarouselPost({
  title,
  orbit = [],
  logo = "../../assets/logos/alina-logo.svg"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)",
      position: "relative",
      overflow: "hidden",
      padding: "70px 0",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    style: {
      height: 190,
      display: "block",
      margin: "0 auto"
    },
    alt: "alina mart\xEDnez"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 330,
      left: 170,
      width: 740,
      height: 740,
      border: "1px solid var(--ink-900)",
      borderRadius: "50%",
      clipPath: "polygon(0 0,42% 0,42% 12%,0 12%,0 100%,100% 100%,100% 0,58% 0,58% 12%,100% 12%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 600,
      left: 120,
      right: 120,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 60,
      right: 60,
      top: 66,
      height: 96,
      background: "var(--accent-brush)",
      display: "block",
      borderRadius: "4px 30px 6px 24px"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "relative",
      fontWeight: 700,
      fontSize: 62,
      lineHeight: 1.18,
      margin: 0,
      textWrap: "pretty"
    }
  }, title)), orbit.map((t, i) => {
    const pos = [{
      top: 330,
      left: 90
    }, {
      top: 330,
      right: 90
    }, {
      bottom: 250,
      left: 200
    }, {
      bottom: 250,
      right: 200
    }][i] || {};
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        position: "absolute",
        ...pos,
        fontWeight: 300,
        fontSize: 38,
        lineHeight: 1.25,
        maxWidth: 300,
        margin: 0
      }
    }, "“" + t + "”");
  }));
}
Object.assign(__ds_scope, { CarouselPost });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/CarouselPost.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/IllustrationPost.jsx
try { (() => {
/** 1080×1350 post: quote above, line-art figure standing on the hairline ground rule. */
function IllustrationPost({
  quote,
  pose = "arms",
  logo = "../../assets/logos/alina-logo.svg"
}) {
  const src = "../../assets/illustrations/alina-figure-" + pose + ".png";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "70px 0 0",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    style: {
      height: 190
    },
    alt: "alina mart\xEDnez"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 52,
      lineHeight: 1.22,
      textAlign: "center",
      fontWeight: 300,
      margin: "80px 100px 0",
      color: "var(--ink-900)",
      textWrap: "pretty"
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 660
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 145,
      borderTop: "1px solid var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      height: 650
    }
  })));
}
Object.assign(__ds_scope, { IllustrationPost });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/IllustrationPost.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/PhotoAdPost.jsx
try { (() => {
/** 1080×1350 campaign/ad post: photo with stacked marker capsules and a knockout CTA. */
function PhotoAdPost({
  photo = "../../assets/brand/post-photo-example.png",
  lines = [],
  footnote,
  cta,
  logo = "../../assets/logos/logo-white.png"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-core)",
      background: "var(--surface-mist)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 80,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: "var(--butter-400)",
      fontWeight: 700,
      fontSize: 58,
      padding: "10px 26px",
      lineHeight: 1.2,
      transform: "translateX(" + (i % 2 ? 18 : -18) + "px)"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 120,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18
    }
  }, footnote && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--butter-400)",
      fontWeight: 700,
      fontSize: 38,
      padding: "10px 22px",
      textAlign: "center",
      lineHeight: 1.3,
      maxWidth: 640
    }
  }, footnote), cta && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--white)",
      fontWeight: 700,
      fontSize: 44,
      padding: "14px 40px",
      border: "1px solid var(--butter-400)"
    }
  }, cta)), /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      position: "absolute",
      right: 44,
      bottom: 34,
      height: 120
    }
  }));
}
Object.assign(__ds_scope, { PhotoAdPost });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/PhotoAdPost.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/QuotePost.jsx
try { (() => {
/** 1080×1350 quote post — the brand's highest-volume format. */
function QuotePost({
  quote,
  bold,
  logo = "../../assets/logos/alina-logo.svg",
  brush = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1080,
      height: 1350,
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "70px 90px",
      boxSizing: "border-box",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    style: {
      height: 190
    },
    alt: "alina mart\xEDnez"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 64,
      lineHeight: 1.16,
      textAlign: "center",
      margin: 0,
      fontWeight: 300,
      color: "var(--ink-900)",
      textWrap: "pretty"
    }
  }, bold && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      background: brush ? "var(--accent-brush)" : "transparent",
      padding: brush ? "0 8px" : 0
    }
  }, bold), bold && " ", quote)));
}
Object.assign(__ds_scope, { QuotePost });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/QuotePost.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
function About() {
  const {
    Highlight,
    Divider
  } = window.NSREF;
  return /*#__PURE__*/React.createElement("section", {
    id: "sobre",
    style: {
      background: "var(--surface-mist)",
      fontFamily: "var(--font-core)",
      padding: "var(--space-9) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: "var(--space-8)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/alina-portrait.png",
    alt: "Alina Mart\xEDnez",
    style: {
      width: "100%",
      borderRadius: "var(--radius-lg)",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-widest)",
      color: "var(--text-secondary)",
      margin: "0 0 var(--space-4)"
    }
  }, "sobre m\xED"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h1)",
      fontWeight: 700,
      lineHeight: 1.1,
      margin: "0 0 var(--space-5)"
    }
  }, "Cada una de tus ", /*#__PURE__*/React.createElement(Highlight, null, "decisiones"), " importa"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 300,
      fontSize: "var(--text-lg)",
      lineHeight: 1.65,
      maxWidth: "52ch",
      margin: 0
    }
  }, "Te ayudo a tomarlas de manera consciente. El cambio es todos los d\xEDas: trabajamos a tu ritmo, sin recetas y sin prisa, para que puedas nombrar lo que sientes y avanzar."), /*#__PURE__*/React.createElement(Divider, {
    tone: "ink",
    spacing: "var(--space-6)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-7)",
      fontWeight: 300,
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Sesiones en l\xEDnea", /*#__PURE__*/React.createElement("br", null), "y presenciales"), /*#__PURE__*/React.createElement("span", null, "Enfoque en emociones", /*#__PURE__*/React.createElement("br", null), "y decisiones"), /*#__PURE__*/React.createElement("span", null, "Espa\xF1ol", /*#__PURE__*/React.createElement("br", null), "M\xE9xico")))));
}
Object.assign(__ds_scope, { About });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
function Contact({
  onSubmit,
  sent
}) {
  const {
    Accordion,
    Field,
    Input,
    Textarea,
    Select,
    Checkbox,
    Button,
    Toast
  } = window.NSREF;
  const [ok, setOk] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    id: "preguntas",
    style: {
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)",
      padding: "var(--space-9) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      fontWeight: 700,
      margin: "0 0 var(--space-5)"
    }
  }, "Preguntas frecuentes"), /*#__PURE__*/React.createElement(Accordion, {
    items: [{
      question: "¿Cuánto dura una sesión?",
      answer: "50 minutos, en línea o presencial."
    }, {
      question: "¿Cada cuándo nos vemos?",
      answer: "Cada semana al principio; después ajustamos el ritmo juntas."
    }, {
      question: "¿Cómo agendo?",
      answer: "Llena el formulario y te comparto los horarios disponibles."
    }, {
      question: "¿Es terapia?",
      answer: "Es acompañamiento en coaching: trabajamos sobre decisiones y hábitos del presente."
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 700,
      margin: "0 0 var(--space-5)"
    }
  }, "Agenda tu sesi\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nombre"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Tu nombre"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Correo",
    hint: "Te respondo en menos de 24 h"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "tu@correo.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Tipo de sesi\xF3n"
  }, /*#__PURE__*/React.createElement(Select, {
    options: [{
      value: "i",
      label: "Sesión individual"
    }, {
      value: "p",
      label: "Sesión de pareja"
    }, {
      value: "g",
      label: "Taller grupal"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\xBFQu\xE9 te trae aqu\xED?"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "Cu\xE9ntame en una l\xEDnea"
  })), /*#__PURE__*/React.createElement(Checkbox, {
    checked: ok,
    onChange: e => setOk(e.target.checked),
    label: "Acepto el aviso de privacidad"
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    disabled: !ok,
    onClick: onSubmit
  }, "Enviar"), sent && /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    message: "Gracias, te escribo pronto."
  })))));
}
Object.assign(__ds_scope, { Contact });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onAgendar
}) {
  const {
    Button
  } = window.NSREF;
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    style: {
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-8) var(--space-6) 0",
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: "var(--space-7)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-widest)",
      color: "var(--text-secondary)",
      margin: "0 0 var(--space-5)"
    }
  }, "existir consciente"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(40px,5vw,72px)",
      lineHeight: 1.06,
      fontWeight: 700,
      margin: "0 0 var(--space-5)",
      letterSpacing: "-.02em"
    }
  }, "Plantea", /*#__PURE__*/React.createElement("br", null), "la vida", /*#__PURE__*/React.createElement("br", null), "planeada"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 300,
      fontSize: "var(--text-lg)",
      lineHeight: 1.6,
      maxWidth: "34ch",
      margin: "0 0 var(--space-6)"
    }
  }, "Conecta contigo mismo, agenda una sesi\xF3n y reinicia tu vida."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onAgendar
  }, "Agenda tu sesi\xF3n")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 520,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: 96,
      left: "-40%",
      right: "-40%",
      borderTop: "1px solid var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/alina-figure-arms.png",
    alt: "",
    style: {
      height: 500,
      position: "relative"
    }
  }))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sessions.jsx
try { (() => {
const ITEMS = [{
  tone: "paper",
  title: "Sesión individual",
  copy: "50 minutos para ordenar lo que traes. En línea o presencial.",
  tag: "1:1"
}, {
  tone: "butterSoft",
  title: "Acompañamiento",
  copy: "Un proceso de varias semanas para sostener el cambio.",
  tag: "proceso"
}, {
  tone: "lilac",
  title: "Taller grupal",
  copy: "Herramientas prácticas en grupos pequeños.",
  tag: "grupo"
}];
function Sessions({
  onAgendar
}) {
  const {
    Card,
    Badge,
    Button,
    Tabs
  } = window.NSREF;
  const [tab, setTab] = React.useState("i");
  return /*#__PURE__*/React.createElement("section", {
    id: "sesiones",
    style: {
      background: "var(--surface-page)",
      fontFamily: "var(--font-core)",
      padding: "var(--space-9) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h1)",
      fontWeight: 700,
      margin: "0 0 var(--space-3)"
    }
  }, "Resuelve los temas que tienes pendientes y comienza a crecer"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 300,
      fontSize: "var(--text-lg)",
      maxWidth: "52ch",
      margin: "0 0 var(--space-6)",
      lineHeight: 1.6
    }
  }, "Elige el formato que te acomode. Si no sabes cu\xE1l, escr\xEDbeme y lo vemos juntas."), /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "i",
      label: "Individual"
    }, {
      value: "p",
      label: "Pareja"
    }, {
      value: "g",
      label: "Grupo"
    }],
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: "var(--space-6)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-5)"
    }
  }, ITEMS.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it.title,
    tone: it.tone,
    bordered: it.tone === "paper"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: it.tone === "lilac" ? "ink" : "lilac"
  }, it.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h3)",
      fontWeight: 700,
      margin: "var(--space-4) 0 var(--space-2)"
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 300,
      fontSize: "var(--text-body)",
      lineHeight: 1.6,
      margin: "0 0 var(--space-5)"
    }
  }, it.copy), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: onAgendar
  }, "Agendar"))))));
}
Object.assign(__ds_scope, { Sessions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sessions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteFooter.jsx
try { (() => {
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--ink-900)",
      color: "var(--text-inverse)",
      fontFamily: "var(--font-core)",
      padding: "var(--space-8) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/logo-white.png",
    alt: "alina mart\xEDnez",
    style: {
      height: 96
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 300,
      fontSize: "var(--text-sm)",
      margin: 0,
      maxWidth: "34ch",
      lineHeight: 1.6
    }
  }, "Conecta contigo mismo, agenda una sesi\xF3n y reinicia tu vida."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      fontSize: "var(--text-sm)",
      fontWeight: 300
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    style: {
      color: "var(--white)",
      textDecoration: "none"
    }
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    style: {
      color: "var(--white)",
      textDecoration: "none"
    }
  }, "Facebook"), /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    style: {
      color: "var(--white)",
      textDecoration: "none"
    }
  }, "WhatsApp"))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteHeader.jsx
try { (() => {
function SiteHeader({
  onNav,
  active = "inicio"
}) {
  const items = [["inicio", "Inicio"], ["sesiones", "Sesiones"], ["sobre", "Sobre mí"], ["preguntas", "Preguntas"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "var(--butter-400)",
      fontFamily: "var(--font-core)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "18px var(--space-6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/alina-logo.svg",
    alt: "alina mart\xEDnez",
    style: {
      height: 64
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-6)"
    }
  }, items.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#" + id,
    onClick: () => onNav && onNav(id),
    style: {
      textDecoration: "none",
      fontSize: "var(--text-body)",
      fontWeight: active === id ? 500 : 300,
      color: "var(--text-primary)",
      borderBottom: "1px solid " + (active === id ? "var(--ink-900)" : "transparent"),
      paddingBottom: 2
    }
  }, label)))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteHeader.jsx", error: String((e && e.message) || e) }); }

__ds_ns.FigureIllustration = __ds_scope.FigureIllustration;

__ds_ns.PhotoOverlay = __ds_scope.PhotoOverlay;

__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Highlight = __ds_scope.Highlight;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.CarouselPost = __ds_scope.CarouselPost;

__ds_ns.IllustrationPost = __ds_scope.IllustrationPost;

__ds_ns.PhotoAdPost = __ds_scope.PhotoAdPost;

__ds_ns.QuotePost = __ds_scope.QuotePost;

__ds_ns.About = __ds_scope.About;

__ds_ns.Contact = __ds_scope.Contact;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.Sessions = __ds_scope.Sessions;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
