let newDate = new Date()
export let date = newDate.getDate();
export let month = newDate.getMonth() + 1;
if (month === 1) {
    month = 'ianuarie'
} else if (month === 2) {
    month = 'februarie'
} else if (month === 3) {
    month = 'martie'
} else if (month === 4) {
    month = 'aprilie'
} else if (month === 5) {
    month = 'mai'
} else if (month === 6) {
    month = 'iunie'
} else if (month === 7) {
    month = 'iulie'
} else if (month === 8) {
    month = 'august'
} else if (month === 9) {
    month = 'septembrie'
} else if (month === 10) {
    month = 'octombrie'
} else if (month === 11) {
    month = 'noiembrie'
} else if (month === 12) {
    month = 'decembrie'
} else {
    console.log('eroare')
}