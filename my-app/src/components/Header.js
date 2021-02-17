import PropTypes from 'prop-types'
import Button from "./Buttons"

//.css in .js
const headingStyle = {
    // color: 'red', backgroundColor:'blue'
}

//function component?
const Header = (props) => {
    //e is an event object and as many fields


    return(
        <header className ='header'>
            {/*style lets us style things reme,ber that things in curly brackets creat objects-*/}

            <h1 style={headingStyle}>{props.title}</h1>
            {/* onClick is an event and there are many of them*/}
            <Button color = {!props.showAdd ? "green" : "red"} text = {!props.showAdd ? "Add" : "close"} onClick = {props.onAdd}/>
            {/* easy way to add more buttons
            <Button color = "blue" text = "Test"/>
            */}

        </header>

    )

}


Header.defaultProps = {
    title: 'Task Tracker'
}

//used to check the types
Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header