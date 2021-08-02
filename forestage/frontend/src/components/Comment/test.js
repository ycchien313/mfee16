import React, { Component } from 'react'
import '../../styles/comment/test.scss'
class Star extends Component {
  constructor(props) {
    super(props)
    this.state = {
      starNum: ['star0', 'star0', 'star0', 'star0', 'star0'], //设置默认背景图
    }
  }

  componentDidMount() {
    this.getStar(Math.round(this.props.star) + 1) //将传过来的类似7.3数字进行四舍五入再除2，得到的是类似2,3.5,6这种值
  }
  getStar(num) {
    let newStar = this.state.starNum.map((item) => {
      //当num=3.5时遍历后newStar数组变成['star2','star2','star2','star1','star0','star0']
      --num
      return num >= 1 ? 'star2' : 'star0' //两次三目运算
    })
    this.setState({
      starNum: newStar, //设置state为遍历后的新数组
    })
  }
  render() {
    return (
      <span className="star">
        {this.state.starNum.map((item, index) => {
          return <span className={item} key={index}></span>
        })}
      </span>
    )
  }
}
export default Star
