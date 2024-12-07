/*** 
File: script.js
GUI Assignment: HW4 - Part 1
Austin Nguyen, UMass Lowell, austin_nguyen@student.uml.edu
Copyright (c) 2024. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.

Updated on November 27, 2021 by Austin Nguyen

This file contains code for validation of the user's input for the Multiplication Table Generator.
It will validate the user's input for the minimum and maximum values for the columns and rows, such
that it will agree with the following rules before generating the table:
    - Columns and rows must be integers
    - Columns and rows must be within the range of -50 to 50
    - Columns and rows must be filled in
    - The minimum value must be less than the maximum value
    
The generateTable function is called when the user's input is valid and submitted, it was taken from
Homework 3 and slightly modified.
***/

// jQuery validation for the numberForm
$(document).ready(function() {
$("#numberForm").validate({
    /* Validation rules for all four inputs such that:
        - They are required
        - They are numbers
        - They are within the range of -50 and 50
        - The minimum value is less than the maximum value
    */
    rules: {
        minCol: {
            required: true,
            number: true,
            range: [-50, 50]
        }, 
        maxCol: {
            required: true,
            number: true,
            range: [-50, 50]
        },
        minRow: {
            required: true,
            number: true,
            range: [-50, 50]
        },
        maxRow: {
            required: true,
            number: true,
            range: [-50, 50]
        }
    },
    /*  Custom messages for validation error handling that follows the same four
        rules mentioned above.
    */
    messages: {
        minCol: {
            required: "Please enter a minimum column value",
            number: "Please enter a valid number",
            range: "Please enter a number between -50 and 50"
            },
        maxCol: {
                required: "Please enter a maximum column value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            minRow: {
                required: "Please enter a minimum row value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            maxRow: {
                required: "Please enter a maximum row value",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            }
        },
        // Form submit handler, god this was a pain to get working
    submitHandler: function() {  
        // Call the generateTable
        generateTable();
        }
    });
});

/*  Add method to check if the minimum value is less than the maximum value
    References used:
    - https://stackoverflow.com/questions/1260984/jquery-validate-less-than
    - https://jqueryvalidation.org/jQuery.validator.addMethod/
*/
$.validator.addMethod("greaterThan",
    function(value, max, min){
        return parseInt(value) > parseInt($(min).val());
    }, "Minimum values must be less than maximum values."
);

$.validator.addMethod("lessThan",
    function(value, max, min){
        return parseInt(value) < parseInt($(min).val());
    }, "Minimum  values must be less than maximum values."
);


/*  Function from Homework 3 to generate the table based on the user's input
    Slighly modified for debugging purposes and to ensure submitHandler works properly
    NOTE: References for code used are not included in this file, but are included in the script.js file
    since this code is taken straight from Homework 3 and large comment blocks are not needed.
*/
function generateTable() {
    document.getElementById("table-container").innerHTML = "";
    
    // Get input values
    const minCol = parseInt(document.getElementById("minCol").value);
    const maxCol = parseInt(document.getElementById("maxCol").value);
    const minRow = parseInt(document.getElementById("minRow").value);
    const maxRow = parseInt(document.getElementById("maxRow").value);

    // Set top left cell to be empty, giving it an id of blankCell, also this method 
    // does not allow tabs in the string
    let table = '<table><tr><th id="blankCell"></th>';

    // Create the table headers based on column range
    for (let col = minCol; col <= maxCol; col++) {
        let colHeader = `<th id="colHeader">${col}</th>`;
        table += colHeader;
    }
    table += '</tr>';
        
    // Generate table rows based on row range
    for (let row = minRow; row <= maxRow; row++) {
        // Create the row header, id of rowHeader, where in each row...
        let rowHeader = `<tr><th id="rowHeader">${row}</th>`;
        table += rowHeader;
        for (let col = minCol; col <= maxCol; col++) {
            // Create the cell with the product of the row and column, id of value
            let cell = `<td id="value">${row * col}</td>`;
            table += cell;
        }
        table += '</tr>';
    }
    table += '</table>';

    // Display the table in the container via innerHTML
    document.getElementById("table-container").innerHTML = table;
}


