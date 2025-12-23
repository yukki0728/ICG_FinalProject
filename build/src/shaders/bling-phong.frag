#version 330 core

// TODO: Implement bling-phong shading

in vec3 fragPos;
in vec3 Normal;
in vec2 TexCoord;

out vec4 fragColor;

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

uniform sampler2D ourTexture;

void main()
{
    vec3 N = normalize(Normal);
    vec3 L = normalize(light.position - fragPos);
    vec3 V  = normalize(viewPos - fragPos);
    vec3 H = normalize(L + V);

    vec3 ambient, diffuse, specular;
    ambient = light.ambient * material.ambient; //L_a * K_a
    diffuse = light.diffuse * material.diffuse * max(dot(L, N), 0.0); //L_d * K_d * (L ⋅ N)
    specular = light.specular * material.specular * pow(max(dot(N, H), 0.0), material.gloss); //L_s * K_s * (N ⋅ H)^alpha

    vec4 texColor = texture(ourTexture, TexCoord);
    fragColor = vec4(ambient + diffuse + specular, 1.0) * texColor;
}
