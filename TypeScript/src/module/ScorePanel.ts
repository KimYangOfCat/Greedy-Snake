//定义记分板的类
class ScorePanel{
    score=0;
    level=1;

    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //限制最高等级
    maxLevel:number;
    //限制升级分数
    upScore:number;

    constructor(maxLevel:number,upScore:number){
        this.scoreEle=document.getElementById('score')!;
        this.levelEle=document.getElementById('level')!; 
        this.maxLevel=maxLevel;
        this.upScore=upScore
    }

    //设置一个加分的方法
    addScore(){
        this.scoreEle.innerHTML=++this.score+'';
        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }

    //定义一个提升等级的方法
    levelUp(){
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML=++this.level+'';
        }
    }
}

//测试代码
// const scorePanel=new ScorePanel(10,10);
export default ScorePanel;