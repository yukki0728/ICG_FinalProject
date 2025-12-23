#version 330 core

// TODO:
// Implement Gouraud shading

in vec3 vertexColor;
in vec2 TexCoord;

out vec4 fragColor;

uniform sampler2D ourTexture;

void main()
{
	vec4 texColor = texture(ourTexture, TexCoord);
    fragColor = vec4(vertexColor, 1.0) * texColor;
}
