var e=globalThis,t={},o={},r=e.parcelRequire98dc;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},e.parcelRequire98dc=r),r.register;var n=r("7vzAp"),l=r("aYfvi");new n.Page("Random Seed",e=>{let t={old_paper:()=>e.color("#E0C9A6"),gunmetal:()=>e.color("#2E2F2E")},o=e.loadFont("/assets/fonts/SpecialElite.ttf");e.setup=()=>{e.createCanvas(800,1e3)},e.draw=()=>{e.background(t.old_paper()),e.noFill(),(0,l.pushpop)(e,()=>{e.stroke(t.gunmetal()),e.strokeWeight(10),e.circle(e.random(800),e.random(1e3),200)}),function(e,t){let[o,r]=t.position;e.push(),e.textAlign(e.RIGHT,e.BOTTOM),e.noStroke(),e.fill(t.text_color),e.textFont(t.font),e.textSize(15);let l=.25*e.textSize();e.text(`[id:${(0,n.get_current_seed)()}]`,o-l,r-l),e.pop()}(e,{position:[800,1e3],text_color:t.gunmetal(),font:o}),e.noLoop()}});
//# sourceMappingURL=index.81df3b62.js.map