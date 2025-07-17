// src/components/specific/userRegistrationForm.tsx
"use client"; // 🧑‍💻 Indica que este é um Client Component, pois usa hooks do React e do Next.js

import React from "react";
import { useForm } from "react-hook-form"; // 🎣 Importa o hook 'useForm' do React Hook Form
import { zodResolver } from "@hookform/resolvers/zod"; // 🤝 Importa o resolvedor para integrar Zod com React Hook Form

// 📚 Importa o schema e tipo para os dados do formulário de usuário do seu arquivo de validação
import { userSchema, UserFormData } from "@/app/usuarios/utils/userValidation";

// 🔗 Importa a instância configurada do Axios para requisições à API
import api from "@/axios";

const UserRegistrationForm: React.FC = () => {
  // 📦 Configura o React Hook Form com o resolver Zod para validação
  const {
    register, // ✍️ Função para registrar os campos do input
    handleSubmit, // 🚀 Função para lidar com o envio do formulário
    formState: { errors, isSubmitting }, // 📊 Estado do formulário (erros de validação, estado de envio)
    reset, // 🔄 Função para resetar o formulário
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema), // Conecta o Zod para validação dos inputs
  });

  // 📨 Função assíncrona que é chamada ao enviar o formulário
  const onSubmit = async (data: UserFormData) => {
    try {
      // 🎯 Faz uma requisição POST para o endpoint '/users' da API com os dados do formulário
      const response = await api.post("/users", data);
      console.log("Usuário cadastrado com sucesso:", response.data); // 🎉 Log de sucesso
      alert("Usuário cadastrado com sucesso! 🎉"); // 🥳 Alerta de sucesso para o usuário
      reset(); // ✨ Limpa o formulário após o envio bem-sucedido
    } catch (error: any) {
      // 🚨 Em caso de erro, loga o erro e exibe um alerta
      console.error(
        "Erro ao cadastrar usuário:",
        error.response?.data || error.message
      );
      alert(
        "Erro ao cadastrar usuário: " +
          (error.response?.data?.message ||
            "Verifique o console para mais detalhes. 😔")
      );
    }
  };

  // 📝 Renderização do formulário
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {" "}
      {/* 🖼️ Envolve o formulário para centralizar e dar um fundo */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-gray-100"
      >
        {" "}
        {/* 💅 Estilo do formulário */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-reuse-blue">
          {" "}
          {/* ✍️ Título do formulário estilizado */}
          Cadastre-se no ReUSE 🚀
        </h2>
        <div className="mb-6">
          {" "}
          {/* 📦 Grupo de input com margem inferior */}
          <label
            htmlFor="nome"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Nome: ✨
          </label>
          <input
            type="text"
            id="nome"
            {...register("nome")} // 🎣 Conecta o input ao React Hook Form
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-reuse-blue focus:border-transparent transition duration-200" // 🎨 Estilos do input com Tailwind
          />
          {errors.nome && (
            <p className="text-red-600 text-xs italic mt-2">
              {errors.nome.message} 🚫
            </p>
          )}{" "}
          {/* ❌ Exibe mensagem de erro se houver */}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            E-mail: 📧
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-reuse-blue focus:border-transparent transition duration-200"
          />
          {errors.email && (
            <p className="text-red-600 text-xs italic mt-2">
              {errors.email.message} 🚫
            </p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="senha"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Senha: 🔒
          </label>
          <input
            type="password"
            id="senha"
            {...register("senha")}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-reuse-blue focus:border-transparent transition duration-200"
          />
          {errors.senha && (
            <p className="text-red-600 text-xs italic mt-2">
              {errors.senha.message} 🚫
            </p>
          )}
        </div>
        {}
        <div className="mb-6">
          <label
            htmlFor="tipo_usuario"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Tipo de Usuário: 👤
          </label>
          <select
            id="tipo_usuario"
            {...register("tipo_usuario")}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-reuse-blue focus:border-transparent transition duration-200"
          >
            <option value="">Selecione um tipo</option>
            <option value="doador">Doador</option>
            <option value="receptor">Receptor</option>
          </select>
          {errors.tipo_usuario && (
            <p className="text-red-600 text-xs italic mt-2">
              {errors.tipo_usuario.message} 🚫
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          {" "}
          {/* 💯 Centraliza o botão */}
          <button
            type="submit"
            disabled={isSubmitting} // 🚫 Desabilita o botão enquanto o formulário está sendo enviado
            className="bg-reuse-green hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-4 focus:ring-reuse-green focus:ring-opacity-50 disabled:opacity-60 transition duration-300 transform hover:scale-105" // 🎨 Estilo do botão
          >
            {isSubmitting ? "Cadastrando... ⏳" : "Cadastrar Usuário 🧑‍💻"}{" "}
            {/* ⏱️ Texto do botão muda durante o envio */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
