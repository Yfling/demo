// 现需要设计一个聊天常用语热键，主要覆盖如下功能
// 1.支持热键的创建。要求：热键的创建为功能键+数字键，如ctrl+ [0-9]
// 2.支持热键的使用。要求：不能覆盖浏览器自带快捷键功能ctrl+a/c/v等
// 3.支持热键提示的面板唤醒。要求：输入框中长按功能键（ctrl）唤醒面板，快速按下热键时则不需要唤醒
// 4.唤醒提示面板后可以按上下键切换选择，enter键确认输入
 
import './App.css';
import { Button, AutoComplete, message} from 'antd';
import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inputValue: '',
          openStatus: false,
        };
        this.lastkeyCode = '';
        this.inputKeyUp = this.inputKeyUp.bind(this);
        
        this.options = [
        ];
    }

    inputKeyUp = (value) => {
      const keyCode = value.keyCode;
      this.lastkeyCode = keyCode;

      // 按下control + 0~9
      if (value.ctrlKey) {
        if (keyCode >= 48 && keyCode <= 57) {
          const index = this.findOptions(keyCode);
          if (!index) {
            this.options.push({value: this.state.inputValue, key: keyCode})
            message.success('热键已添加');
            this.setState({
              inputValue: ''
            })
          }
          else {
            this.printOtions(keyCode);
          }
        }
      }
      if (keyCode === 17) {  
        this.switchOpenStatus();
      }
    }

    findOptions = (keyCode) => {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i]['key'] === keyCode) {
          return i;
        }
      }
    }

    printOtions = (keyCode) => {
      const index = this.findOptions(keyCode);
      const newInputValue = this.state.inputValue + this.options[index].value;
      this.setState({
        inputValue: newInputValue
      });
    }

    onChange = (e) => {
      this.setState({
        inputValue: e
      })
    };

    switchOpenStatus = () => {
      this.setState({
        inputValue: '',
        openStatus: !this.state.openStatus
      })
    }


    render() {
        return (
          <div>
            <div style={{width: '90%', margin: '30px auto'}}>
              <AutoComplete
                style={{
                  width: 800,
                  height: 300
                }}
                options={this.options}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onKeyUp={this.inputKeyUp}
                value={this.state.inputValue}
                onChange={this.onChange}
                open={this.state.openStatus}
              />

              <Button 
                style={{marginLeft: '20px'}} 
                type="primary"
                onClick={this.switchOpenStatus}
              >常用语</Button>
            </div>
          </div>
        );
    }
}
