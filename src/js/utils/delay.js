/**
 * Aguarda um número especificado de milissegundos antes de resolver a Promise.
 * Útil para pausar a execução em funções assíncronas (async/await).
 *
 * @param {number} ms O número de milissegundos a aguardar.
 * @returns {Promise<void>} Uma Promise que resolve após o tempo especificado.
 *
 * @example
 * // Exemplo 1: Uso básico com async/await
 * async function runExample1() {
 * console.log("Início da espera...");
 * await delay(2000); // Aguarda 2 segundos
 * console.log("Fim da espera!");
 * }
 * runExample1();
 *
 * @example
 * // Exemplo 2: Uso em loop para controle de fluxo
 * async function runExample2() {
 * for (let i = 0; i < 3; i++) {
 * console.log(`Contagem: ${i + 1}`);
 * await delay(500); // Aguarda 500ms entre as contagens
 * }
 * console.log("Loop finalizado.");
 * }
 * runExample2();
 * 
 * 
 *  * @example
 * // Exemplo 3: Uso em loop para controle de fluxo
 * async function runExample3() {
 * for (let i = 0; i < 3; i++) {
 * console.log(`Contagem: ${i + 1}`);
 * delay(500).then( ()=>{
 *                      
 *  console.log("Loop finalizado.");
 * }); // Aguarda 500ms entre as contagens
 * }
 *
 * }
 * runExample3();
 */
export const delay = (ms) => new Promise(res => setTimeout(res, ms));
