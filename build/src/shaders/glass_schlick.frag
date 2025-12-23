#version 330 core

// TODO: Implement glass shading with schlick method

in vec3 fragPos;
in vec3 Normal;

out vec4 fragColor;

uniform vec3 viewPos;
uniform samplerCube skybox;

uniform float AIR_coeff;
uniform float GLASS_coeff;

void main()
{          
    vec3 N = normalize(Normal);
    vec3 V = normalize(viewPos - fragPos);

    vec3 I = -V;

    vec3 R = I - 2.0 * dot(I, N) * N;
    vec3 T;
    float n = AIR_coeff / GLASS_coeff;
    float K = 1 - pow(n, 2) * (1 - pow(dot(I, N), 2));
    if (K < 0.0) T = vec3(0.0);
    else T = n * I - (n * dot(I, N) + sqrt(K)) * N;

    vec3 C_reflect = texture(skybox, R).rgb;
    vec3 C_refract = texture(skybox, T).rgb;

    float R0 = pow((AIR_coeff - GLASS_coeff) / (AIR_coeff + GLASS_coeff), 2);
    float R_theta = R0 + (1.0 - R0) * pow(1.0 + dot(I, N), 5);
    vec3 C_final = R_theta * C_reflect + (1.0 - R_theta) * C_refract;

    fragColor = vec4(C_final, 1.0);
} 
