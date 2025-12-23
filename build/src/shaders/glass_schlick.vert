#version 330 core
layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;

out vec3 fragPos;
out vec3 Normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// TODO: Implement glass shading with schlick method

void main()
{
    vec4 position = vec4(aPos, 1.0f);
    vec4 worldPos = model * position;
    fragPos = vec3(worldPos);

    //若P′ = M ⋅ P 且 (N′)^T ⋅ P′ = (N)^T ⋅ P
    //則(N′)^T ⋅ M ⋅ P = (N)^T ⋅ P，故N′ = [(N)^T ⋅ (M)^(-1)]^T = [(M)^(-1)]^T * N
    Normal = mat3(transpose(inverse(model))) * aNormal;

    gl_Position = projection * view * model * position;
}
