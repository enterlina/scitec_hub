import React from "react";
import { connect } from 'react-redux';

import {substrName, langArrayHandler} from '../utilities';

require("./Dropdown.scss");

import onClickOutside from 'react-onclickoutside'

class Dropdown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selected: [],
        allFields: [],
        isOpened: false
      }
    }
    componentDidMount() {
      this.props.loadDropdown();
    }
    handleClickOutside = evt => {
      if(this.state.isOpened) {
        this.setState({isOpened: false})
      }
    }
    generateTree(data) {
      // console.log(data)
        if (data == undefined || data.length == 0) { return false}
        let path = [];
      let expandElement = (element) => {
        path.push(element.name);
        let expanded = element.options.map((item, index)=>{
          if(typeof item == 'string') {
            // <input type="checkbox" name="sphere[]" value={path.join('--') + '--' + item} />
            return <li key={index}><input  onChange={this.handleInputChange.bind(this)} id={item} type="checkbox" name={this.props.name + '--' + item} value={item} /><label htmlFor={item}>{this.props.lang[item] || item}</label></li>
          } else if(typeof item == 'object') {
            return expandElement(item)
          }
        })
        // <input type="checkbox" name="sphere[]" value={element.name} />
        return <li className='Dropdown-parent'>
          <b>{element.name != this.props.name ? <span><input  onChange={this.checkAllFrom.bind(this)} type="checkbox" name={this.props.name + '--' + element.name} value={element.name} id={this.props.name + '--' + element.name} /><label htmlFor={this.props.name + '--' + element.name}>{this.props.lang[element.name] || element.name}</label></span> : ''}</b>
          <ul>{expanded}</ul>
        </li>
      }

      return expandElement(data);
      
    }
    openDropdown = ()=> {
      this.setState({
        isOpened: !this.state.isOpened
      });

    }
    makePlainArray(obj) {
      if (obj == undefined || obj.length == 0) { return false }
      let that = this;
      let resultArr = [];
      resultArr.push(obj.name)
      obj.options.forEach((item)=>{
        if(typeof(item) == 'string') {
          resultArr.push(item);
        } else {
          resultArr = [...resultArr, ...this.makePlainArray(item)]
        }
      })

      return resultArr;
    }
    executeBranch(data, name) {
         
         let resBranch = {};
         const findInBranch = (obj) => {
            if(obj.name == name) {
              resBranch = {...obj};
              return ;
            }
            obj.options.forEach((item) => {
              if(typeof(item) == 'string') {
                return;
              }
              findInBranch(item)
            })
            
         }
         findInBranch(data);
         return resBranch;
    }
    checkAllFrom(event) {
      const filtered = this.props.dropdowns.filter((item)=>{ return item.name == this.props.name});
      const target = event.target;
      const isChecked = target.checked ? true : false;
      // console.log(this.executeBranch(filtered[0], target.value))
      const inherrited = this.makePlainArray(this.executeBranch(filtered[0], target.value));
      let selected = [];
      if(isChecked) {
        selected = inherrited
      } 
      inherrited.forEach((item)=> {
        document.querySelector('[name="'+this.props.name+'--'+item+'"]').checked = isChecked;
      })
      this.setState({
        selected: selected
      });
      this.props.setFilters(this.props.name, selected);

    }
    handleInputChange(event) {
      const target = event.target;
      const isChecked = target.checked ? true : false;
      let selected = this.state.selected;
      
      if(isChecked) {
        selected.push(target.value)
      } else {
        selected = selected.filter((item)=>{
          return item != target.value;
        })
        
      }
      this.setState({
        selected: selected
      });
      this.props.setFilters(this.props.name, selected);

    }
    // saveItems() {
    //   let form = document.getElementById('dropdownForm');
    //   let elements = form.elements;
    //   let result = [];
    //   let lang = 'ru';
    //   for(let i = 0; i < elements.length; i++) {
    //     let item = elements[i];
    //     result.push({
    //       key: item.name,
    //       lang: lang,
    //       value: item.value
    //     });
    //   }

    //   console.log(JSON.stringify(result));
    // }
    render() {

      let filtered = this.props.dropdowns.filter((item)=>{ return item.name == this.props.name});

      let selected = this.state.selected.map((item)=> {
                    return this.props.lang[item.toUpperCase()];
                  }).join(', ');
      
      const sphereText = this.props.lang['SELECT_' + this.props.name.toUpperCase()];
      
      return <div className="Dropdown">
                <div className="Dropdown--selectedItem" onClick={this.openDropdown}>{selected ? substrName(selected, 25) : sphereText }</div>
                <div className={'Dropdown--list ' + (this.state.isOpened ? 'expanded' : '') }>
                  <form>
                    <ul>
                    {this.generateTree(filtered[0])}
                    </ul>
                  </form>
                </div>
              </div>;
    }
}

export default connect(
  state => ({
    lang: state.lang,
    dropdowns: state.dropdowns
  }),
  dispatch => ({
    loadDropdown: () => {
      let params = {
        type: 'dropdowns'
      }
      dispatch({type: "GET_DROPDOWNS", payload: { params: params}});
    },
    setFilters: (name, selected)=> {
      dispatch({type: "SET_FILTERS", payload: {name, selected} });
    }
   })
)(onClickOutside(Dropdown));
