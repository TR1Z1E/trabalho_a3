document.addEventListener("DOMContentLoaded", function () {
  // --- Validação de Login ---
  const btnEntrar = document.getElementById("btnEntrar");
  if (btnEntrar) {
    btnEntrar.addEventListener("click", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const mensagem = document.getElementById("mensagem");

      mensagem.classList.remove("erro", "sucesso");

      if (!email || !senha) {
        mensagem.textContent = "Todos os campos são obrigatórios";
        mensagem.classList.add("erro");
        return;
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        mensagem.textContent = "Email ou senha inválidos";
        mensagem.classList.add("erro");
        return;
      }

      if (senha.length < 8) {
        mensagem.textContent = "Sua senha deve ter no mínimo 8 caracteres";
        mensagem.classList.add("erro");
        return;
      }

      const usuariosAutorizados = [
        { email: "beatriz@gmail.com", senha: "25042004" },
        { email: "example@gmail.com", senha: "batatinha123" },
      ];

      const autorizado = usuariosAutorizados.some(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      if (!autorizado) {
        mensagem.textContent = "Email ou senha incorretos";
        mensagem.classList.add("erro");
        return;
      }

      mensagem.textContent = "Dados OK";
      mensagem.classList.add("sucesso");

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    }); // <- ESSA chave estava faltando
  }

  // --- Botão de voltar ao topo ---
  const btnTopo = document.getElementById("btnTopo");
  if (btnTopo) {
    window.addEventListener("scroll", () => {
      btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btnTopo.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- Cards e Modal ---
  const cardsContainer = document.getElementById("cards-container");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalPreco = document.getElementById("modal-preco");
  const modalQuartos = document.getElementById("modal-quartos");
  const modalBanheiros = document.getElementById("modal-banheiros");
  const modalMetros = document.getElementById("modal-metros");
  const modalClose = document.getElementById("modal-close");

  if (cardsContainer) {
    fetch("dados.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o arquivo JSON");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((imovel) => {
          const card = document.createElement("div");
          card.classList.add("card");

          const img = document.createElement("img");
          img.src = imovel.image;
          img.alt = "Imagem do imóvel";
          img.style.cursor = "pointer";

          img.addEventListener("click", () => {
            modalImg.src = imovel.image;
            modalPreco.textContent = imovel.price;
            modalQuartos.textContent = `${imovel.bedrooms} quarto(s)`;
            modalBanheiros.textContent = `${imovel.bathrooms} banheiro(s)`;
            modalMetros.textContent = `${imovel.size} m²`;
            modal.classList.remove("hidden");
          });

          const preco = document.createElement("p");
          preco.classList.add("preco");
          preco.textContent = imovel.price;

          const info = document.createElement("p");
          info.classList.add("info");
          info.textContent = `${imovel.size} m²`;

          const tags = document.createElement("div");
          tags.classList.add("tags");

          const quartoTag = document.createElement("span");
          quartoTag.classList.add("tag");
          quartoTag.textContent = `${imovel.bedrooms} quarto`;

          const banheiroTag = document.createElement("span");
          banheiroTag.classList.add("tag");
          banheiroTag.textContent = `${imovel.bathrooms} banheiro`;

          tags.appendChild(quartoTag);
          tags.appendChild(banheiroTag);

          card.appendChild(img);
          card.appendChild(preco);
          card.appendChild(info);
          card.appendChild(tags);

          cardsContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar os imóveis:", error);
      });
  }

  if (modal && modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  // --- Redirecionamento dos botões "Comprar" para a página de erro ---
  const botoesComprar = document.querySelectorAll(".btn-comprar");
  botoesComprar.forEach((botao) => {
    botao.addEventListener("click", () => {
      window.location.href = "erro.html";
    });
  });
});
