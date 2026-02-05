const btn0 = document.getElementById("btn0")
const textRes = document.getElementById("res")
btn0.addEventListener("click", ()=>{
agregatexto(btn0.value)
})

function agregatexto(cad){
 console.log("valor agregado "+cad)
 textRes.value+=cad
}