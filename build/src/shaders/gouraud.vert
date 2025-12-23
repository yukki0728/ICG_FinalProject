#version 330 core

// TODO:
// Implement Gouraud shading

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

out vec3 vertexColor;
out vec2 TexCoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

struct Light
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float gloss;
};

uniform vec3 viewPos;
uniform Light light;
uniform Material material;

void main()
{
    vec4 position = vec4(aPos, 1.0f);
    vec3 fragPos = vec3(model * position);
    TexCoord = aTexCoord;

	vec3 N = normalize(mat3(transpose(inverse(model))) * aNormal);
    vec3 L = normalize(light.position - fragPos);
    vec3 V  = normalize(viewPos - fragPos);
    vec3 H = normalize(L + V);

    vec3 ambient, diffuse, specular;
    ambient = light.ambient * material.ambient; //L_a * K_a
    diffuse = light.diffuse * material.diffuse * max(dot(L, N), 0.0); //L_d * K_d * (L ⋅ N)
    specular = light.specular * material.specular * pow(max(dot(N, H), 0.0), material.gloss); //L_s * K_s * (N ⋅ H)^alpha

    vertexColor = ambient + diffuse + specular;
    gl_Position = projection * view * model * position;
}
