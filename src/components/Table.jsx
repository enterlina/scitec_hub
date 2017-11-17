import React from "react";

require("./Table.scss");

// example of data for this Component:

// {
//   fields: Array of heading fields,
//   items: [
//     ["321123213", 'Вакансия', 'Химия', "123213213"],
//     ["321123213", 'Вакансия', 'Химия', "123213213"]
//   ]
// }


class Table extends React.Component {
    render() {
      let table = this.props.data;
      let heading = table.fields.map((item, index) => <div key={index} className="Table--item Table--headingItem"> {item} </div>);

      let items = table.items.map((row, index) => {
        let items = row.map((item, index) => <div key={index} className="Table--item"><span className="showMobile">{item != '' ? table.fields[index] + ':' : ''} </span> {item} </div>);
        
        return <div className="Table--row"> {items} </div>
      });
        return <div className="Table">
          <div className="Table--row">
            {heading}
          </div>
          
          {items}
        </div>;
    }
}

export default Table;