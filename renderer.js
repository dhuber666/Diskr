// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = require('jquery');
const powershell = require('node-powershell');



$('#getDisk').click(() => {

    let computer = $('#computerName').val() || 'localhost';

     // Create the PS Instance
     let ps = new powershell({
        executionPolicy: 'remoteSigned',
        noProfile: true
    })

    // Load the gun
    ps.addCommand("./Get-Drives.ps1", [
        { ComputerName: computer }
    ])

    // Pull the Trigger
    ps.invoke()
    .then(output => {
        console.log(output)
        console.log(JSON.parse(output))
    })
    .catch(err => {
        console.error(err)
        ps.dispose()
    })
})