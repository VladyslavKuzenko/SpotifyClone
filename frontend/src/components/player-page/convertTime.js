export default function convertTime(timeInSeconds){
    const minutes=Math.floor(timeInSeconds/60)
    const seconds=timeInSeconds-minutes*60
    const result=seconds<10?`${minutes}:0${seconds}`:`${minutes}:${seconds}`
    return(result);
}