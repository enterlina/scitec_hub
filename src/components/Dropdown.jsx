import React from "react";
import { connect } from 'react-redux';

import {substrName, langArrayHandler} from '../utilities';

require("!style-loader!css-loader!sass-loader!./Dropdown.scss");

import { getDropdowns } from '../actions/dropdowns';
import { getCardsByFilter, getCardsByType } from '../actions/cards';
class Dropdown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selected: [],
        isOpened: false
      }
    }
    componentDidMount() {
      this.props.loadDropdown();
    }
    generateTree(data) {
      
        if (data == undefined || data.length == 0) { return false}
        let path = [];
      let expandElement = (element) => {
        let expanded = [];
        path.push(element.name);
        element.options.map((item, index)=>{
          if(typeof item == 'string') {
            // <input type="checkbox" name="sphere[]" value={path.join('--') + '--' + item} />
            expanded.push(<li key={index}><input  onChange={this.handleInputChange.bind(this)} id={item} type="checkbox" name={this.props.name + '--' + item} value={item} /><label htmlFor={item}>{this.props.lang[item] || item}</label></li>)
          } else if(typeof item == 'object') {
            expanded.push(expandElement(item))
          }
        })
        // <input type="checkbox" name="sphere[]" value={element.name} />
        return <li>
          <b>{element.name != this.props.name ? <span><input onChange={this.handleInputChange.bind(this)} type="checkbox" name={this.props.name + '--' + element.name} value={element.name} id={element.name} /><label htmlFor={element.name}>{this.props.lang[element.name] || element.name}</label></span> : ''}</b>
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
      // this.props.setFilters(this.props.name, selected);
      if(selected.length != 0){
        this.props.updateCards(this.props.type, this.props.name, selected)
      } else {
        this.props.updateByType(this.props.type)
      }
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
      dispatch(getDropdowns());
    },
    updateCards: (type, name, selected) => {
      dispatch(getCardsByFilter(type, name, selected));
    },
    setFilters: (name, selected)=> {
      dispatch({type: "SET_FILTERS", payload: {name, selected} });
    },
    updateByType: (type)=>{
      dispatch(getCardsByType(type));
    }
   })
)(Dropdown);
