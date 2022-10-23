uniform float time;
uniform float progress;
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;


uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main()    {
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 offset = texture2D(uDataTexture, vUv);
    vec4 tex = texture2D(uTexture, newUV - 0.02*offset.rg);

    float r = tex.r+(abs(offset.x)*.06);
    float g = tex.g+(abs(offset.y)*.08);
    float b = tex.b+(abs((offset.x+offset.y))*.25);

    gl_FragColor = vec4(r, g, b, tex.a);
}