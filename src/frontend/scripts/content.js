// Função para criar um lembrete
function createReminder() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  axios;
  axios
    .post(
      "http://localhost:3000/api/reminders/create",
      {
        title,
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    .then((response) => {
      console.log("Lembrete criado:", response.data);
      // Adicionar o lembrete à lista (você pode implementar isso conforme necessário)
      fetchReminders();
    })
    .catch((error) => {
      console.error("Erro ao criar lembrete:", error.response.data.error);
    });
}

// Função para buscar e exibir a lista de lembretes
function fetchReminders() {
  axios
    .get("http://localhost:3000/api/reminders")
    .then((response) => {
      const remindersList = document.getElementById("remindersList");
      remindersList.innerHTML = ""; // Limpar a lista antes de atualizar

      if (response.data && response.data.reminders) {
        response.data.reminders.forEach((reminder) => {
          // Criar cada item da lista
          const listItem = document.createElement("li");
          listItem.classList.add("reminder-item");

          // Criar o título
          const titleElement = document.createElement("div");
          titleElement.textContent = reminder.title;
          titleElement.classList.add("reminder-title");
          listItem.appendChild(titleElement);

          // Criar o conteúdo
          const contentElement = document.createElement("div");
          contentElement.textContent = reminder.content;
          contentElement.classList.add("reminder-content", "expand"); // Adicionar a classe "expand" inicialmente
          listItem.appendChild(contentElement);

          // Criar o botão de expansão
          const expandButton = document.createElement("button");
          expandButton.textContent = "Expandir";
          expandButton.classList.add("expand-button");
          expandButton.onclick = () =>
            toggleExpand(contentElement, expandButton);
          listItem.appendChild(expandButton);

          remindersList.appendChild(listItem);
        });
      } else {
        console.error(
          'Resposta do servidor não contém a propriedade "reminders":',
          response.data
        );
      }
    })
    .catch((error) => {
      console.error(
        "Erro ao buscar lembretes:",
        error.response ? error.response.data.error : error.message
      );
    });
}

function toggleExpand(contentElement, button) {
  // Troca a classe "expand" no conteúdo do lembrete
  contentElement.classList.toggle("expand");

  // Altera o texto do botão com base na presença da classe "expand"
  button.textContent = contentElement.classList.contains("expand")
    ? "Expandir"
    : "Contrair";
}

window.onload = function () {
  fetchReminders();
};
