![](https://github.com/naoyashiga/gl-draw-rectangle/blob/36dbacdc6ce3363f86854ccb22ae721cdaf03728/capture.png?raw=true)
#gl-draw-rectangle
This is my first WebGL project.

#I used glslify
I don't like GLSL code on js file because I have to write GLSL STRING :weary:.

So I used [glslify](https://www.npmjs.com/package/glslify)! :tada:

```glsl
attribute vec4 coords;
attribute float pointSize;

void main(void) {
 gl_Position = coords;
 gl_PointSize = pointSize;
}
```
I wrote vertex shader file.

```js
const vert = glslify('./index.vert')
```
By using glslify, I can load GLSL external file :sunglasses:

#Other pacakges

- [webgl-context](https://www.npmjs.com/package/webgl-context)
- [canvas-loop](https://www.npmjs.com/package/canvas-loop)
