import React from 'react';
import  Cascader  from 'antd/lib/cascader'
import axios from 'axios'
import 'antd/dist/antd.css'
class App extends React.Component{
  state={
    name:'',
    sex:'',
    date:'',
    city:'',
    street:'',
    tel:'',
    ipv4_1:'',
    ipv4_2:'',
    ipv4_3:'',
    ipv4_4:'',
    profile:''
  }
  inputChange(type,e){
    this.setState({[type]:e.target.value})
  }
  componentWillMount(){
    if(localStorage.form){
      this.setState(JSON.parse(localStorage.form))//读取web存储的数据
    }
  }
  formSubmit(e){//表单提交
    e.preventDefault()
    let state=this.state
    let nowYear=new Date().getFullYear()
    let name=new RegExp("[\u4e00-\u9fa5]{2,4}")
    let tel=new RegExp('^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$')
    if(!name.test(state.name)){
      alert('名字必须为2-4个汉字')
    }else if(!state.sex){
      alert('请填写性别')
    }else if(!state.date){
      alert('请填写出生日期')
    }else if(nowYear-state.date.slice(0,4)<18||nowYear-state.date.slice(0,4)>65){
      alert('年龄必须在18-65之间')
    }else if(!state.tel || !tel.test(state.tel)){
      alert('请正确输入手机号')
    }else{
      let formData=state
      axios.post('192.168.1.1',formData)
      .then(res=>{
        alert('提交成功')
        localStorage.removeItem("form")//清空web存储
        this.setState({//清空状态
          name:'',
          sex:'',
          date:'',
          city:'',
          street:'',
          tel:'',
          ipv4_1:'',
          ipv4_2:'',
          ipv4_3:'',
          ipv4_4:'',
          profile:''
        })
        e.target.reset()//清空表单
      })
      .catch(err=>alert('服务器正忙，稍后再试'))
    }
  }
  render(){
    localStorage.setItem("form",JSON.stringify(this.state)) //把表单数据存到web存储 防止浏览器异常关闭 数据丢失
    const options = [{
      value: 'zhejiang',
      label: '浙江',
      children: [{
        value: 'hangzhou',
        label: '杭州',
        children: [{
          value: 'xihu',
          label: '西湖',
        }],
      }],
      }, {
      value: 'jiangsu',
      label: '江苏',
      children: [{
        value: 'nanjing',
        label: '南京',
        children: [{
          value: 'zhonghuamen',
          label: '中华门',
        }],
      }],
    }];        // 城市信息
    return (
      <div>
        <form onSubmit={this.formSubmit.bind(this)}>
          <label>*姓名：<input onChange={this.inputChange.bind(this,'name')} value={this.state.name} placeholder='2-4个字'/></label><br/>
          <label>*性别：
            <input type="radio" onClick={this.inputChange.bind(this,'sex')} name="sex" value="man" />男
            <input type="radio" onClick={this.inputChange.bind(this,'sex')} name="sex" value="woman"/>女
          </label><br/>
          <label>*出生日期：<input type='date' onChange={this.inputChange.bind(this,'date')} value={this.state.date}/></label><br/>
          <label>*手机号码：<input onChange={this.inputChange.bind(this,'tel')} value={this.state.tel}/></label><br/>
          住址：
            城市:<Cascader
              options={options}
              style={{width:'200px'}}
              onChange={value=>this.setState({city:value})}
              placeholder="请选择"
              value={this.state.city}
            />
          <label>街道:<input onChange={this.inputChange.bind(this,'street')} value={this.state.street}/>
          </label><br/>
          <label>IP地址：
            <input onChange={this.inputChange.bind(this,'ipv4_1')} value={this.state.ipv4_1} style={{width:'25px'}}/>.
            <input onChange={this.inputChange.bind(this,'ipv4_2')} value={this.state.ipv4_2} style={{width:'25px'}}/>.
            <input onChange={this.inputChange.bind(this,'ipv4_3')} value={this.state.ipv4_3} style={{width:'25px'}}/>.
            <input onChange={this.inputChange.bind(this,'ipv4_4')} value={this.state.ipv4_4} style={{width:'25px'}}/>
          </label><br/>
          <label>
            个人简介：<br/>
            <textarea onChange={this.inputChange.bind(this,'profile')} placeholder="140字以内。。" value={this.state.profile} style={{width:'300px',height:'100px'}}/>
          </label><br/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}
export default App
