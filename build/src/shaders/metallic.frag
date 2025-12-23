#version 330 core

// TODO: Implement metallic shading

in vec3 fragPos;
in vec3 Normal;

out vec4 fragColor;

struct Light
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

uniform vec3 viewPos;
uniform Light light;
uniform samplerCube skybox;

uniform float alpha;
uniform float bias;

void main() 
{
    vec3 N = normalize(Normal);
    vec3 L = normalize(light.position - fragPos);
    vec3 V = normalize(viewPos - fragPos);

    float B = max(dot(L, N), 0.0) + bias;
    vec3 C = light.diffuse;
    vec3 I = -V;
    vec3 R = I - 2.0 * dot(I, N) * N;
    vec3 C_reflect = texture(skybox, R).rgb;
    vec3 C_final = alpha * B * C + (1.0 - alpha) * C_reflect;

    fragColor = vec4(C_final, 1.0);
}	
