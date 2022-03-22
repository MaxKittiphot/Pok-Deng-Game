const prompt = require("prompt-sync")();

const ranks = [null ,"ACE","TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "JACK", "QUEEN", "KING"] 
const suits = ["CLUB", "DIAMOND", "HEART", "SPADE"]

let pot = 0;
let bet
let myCard = []
let dealerCard = []


function draw(){
    let rank = ranks[Math.floor(Math.random()*13)+1]
    let suit = suits[Math.floor(Math.random()*4)]
    let card = {
        rank: rank,
        suit: suit
    }
    if(!isExist(card)){
        return {...card}
    }else{
        return draw()
    }
}

function isExist(card){
    let result = false
    myCard.forEach((item)=>{
        if(item.rank==card.rank&&item.suit==card.suit){
            result = true;
        }
    })
    dealerCard.forEach((item)=>{
        if(item.rank==card.rank&&item.suit==card.suit){
            result = true; 
        }
    })
    return result;
}

function compare(myCard, dealerCard){
    let myScore = 0
    let dealerScore = 0

    for(i=0;i<2;i++){
        for(j=1;j<14;j++){
            if(ranks[j]===myCard[i].rank){
                if(j>10){
                    myScore = myScore+10;
                }else{
                    myScore = myScore+j
                }
            }
            if(ranks[j]===dealerCard[i].rank){
                if(j>10){
                    dealerScore = dealerScore+10;
                }else{
                    dealerScore = dealerScore+j
                }
            }
        }
    }

    if(myCard.length===3){
        for(i=1;i<14;i++){
            if(ranks[i]===myCard[myCard.length-1].rank){
                if(i>10){
                    myScore = myScore+10;
                }
                else{
                    myScore = myScore+i;
                }
            }
        }
    }

    myScore = myScore%10;
    dealerScore = dealerScore%10
    // console.log(myScore)
    // console.log(dealerScore)

    if(myScore>dealerScore){
        if(myCard.length==2){
            console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit} and ${myCard[1].rank} of ${myCard[1].suit}`)
        }
        else{
            console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit}, ${myCard[1].rank} of ${myCard[1].suit} and ${myCard[2].rank} of ${myCard[2].suit}`)
        }
        console.log(`Dealer cards are ${dealerCard[0].rank} of ${dealerCard[0].suit} and ${dealerCard[1].rank} of ${dealerCard[1].suit}`)
        console.log("You won!!!")
        pot = pot+bet;
        console.log("Your total pot is "+pot)
    }
    else{
        if(myScore<dealerScore){
            if(myCard.length==2){
                console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit} and ${myCard[1].rank} of ${myCard[1].suit}`)
            }
            else{
                console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit}, ${myCard[1].rank} of ${myCard[1].suit} and ${myCard[2].rank} of ${myCard[2].suit}`)
            }
            console.log(`Dealer cards are ${dealerCard[0].rank} of ${dealerCard[0].suit} and ${dealerCard[1].rank} of ${dealerCard[1].suit}`)
            console.log("You lost!!!")
            pot = pot-bet;
            console.log("Your total pot is "+pot)
        }
        if(myScore==dealerScore){
            if(myCard.length==2){
                console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit} and ${myCard[1].rank} of ${myCard[1].suit}`)
            }
            else{
                console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit}, ${myCard[1].rank} of ${myCard[1].suit} and ${myCard[2].rank} of ${myCard[2].suit}`)
            }
            console.log(`Dealer cards are ${dealerCard[0].rank} of ${dealerCard[0].suit} and ${dealerCard[1].rank} of ${dealerCard[1].suit}`)
            console.log("Draw")
            console.log("Your total pot is "+pot)
        }
    }
}

while(true){
    bet = Number(prompt("How much do you want to bet?: "));
    myCard.push(draw())
    myCard.push(draw())
    dealerCard.push(draw())
    dealerCard.push(draw())
    console.log(`Your cards are ${myCard[0].rank} of ${myCard[0].suit} and ${myCard[1].rank} of ${myCard[1].suit}`)

    let hit = prompt("Do you want to hit? (Y/N): ")
    
    if(hit.trim().toUpperCase()==="Y"){
        myCard.push((draw()))
    }

    compare(myCard, dealerCard)
    const next = prompt("Do you want to continue this game? (Y/N): ")
    if(next.trim().toUpperCase()==="N"){
        break
    }else{
        myCard = []
        dealerCard = []
    }
}

console.log(`Your total pot is ${pot}`);