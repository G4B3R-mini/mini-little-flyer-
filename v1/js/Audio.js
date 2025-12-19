            const audio = document.getElementById("lobby-audio");

            // tenta tocar assim que a página carregar
            window.addEventListener("load", () => {
                audio.play().catch(() => {
                    console.log(
                        "Autoplay bloqueado pelo navegador, aguardando interação..."
                    );
                });
            });

            // caso o navegador bloqueie, qualquer clique na página ativa o áudio
            document.addEventListener("click", () => {
                if (audio.paused) {
                    audio.play();
                }
            });