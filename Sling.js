var [email, pass, name] = args.widgetParameter.split(" ")
const shift = await getNextShift()

var diff_time = ms_to_until(slingISOtoDate(shift.dtstart).valueOf() - new Date().valueOf())

var data = `Days: ${diff_time[3]}\nHours: ${diff_time[2]}\nMinutes: ${diff_time[1]}\nSeconds: ${diff_time[0]}`

let title = `Sling | ${name}`
let widget = new ListWidget()

    let gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [
        new Color("141414"),
        new Color("13223F")
    ]

widget.backgroundGradient = gradient

    let titleStack = widget.addStack()
    let titleField = titleStack.addText(title)
    titleField.textColor = Color.white()
    titleField.textOpacity = 0.7
    titleField.font = Font.mediumSystemFont(13)

widget.addSpacer(12)

    let desc = widget.addText(data)
    desc.minimumScaleFactor = 0.5
    desc.textColor = Color.white()
    desc.font = Font.systemFont(18)

Script.setWidget(widget)
Script.complete()

async function getNextShift() {
    const url = `http://73.112.240.168:3000/next?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`
    const req = new Request(url)
    return await req.loadJSON()
}

function slingISOtoDate(slingISO){
  return new Date(new Date(slingISO.slice(0, slingISO.length-6)).valueOf() + 4 * 60 * 60 * 1000)
}

function ms_to_until(ms){
  var seconds = Math.floor(diff_time / 1000 % 60)
  var minutes = Math.floor(diff_time / 1000 / 60 % 60)
  var hours = Math.floor(diff_time / 1000 / 60 / 60 % 24)
  var days = Math.floor(diff_time / 1000 / 60 / 60 / 24)

  return [seconds, minutes, hours, days]
}
