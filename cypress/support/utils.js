// This function generates a unique email, first name, and last name
function generateUniqueData() {
    const base = 'testuser';
    const randomNumber = Math.floor(Math.random() * 10000);
    const domain = '@petshop.com';
    // Combine the base, random number, and domain to create a unique email address
    const email = base + randomNumber + domain;

    const firstNames = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Miller', 'Anderson', 'Wilson', 'Moore', 'Davis', 'Garcia'];
    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
    const firstName = firstNames[randomFirstNameIndex];
    const lastName = lastNames[randomLastNameIndex];

    // Return an object containing the generated email, first name, and last name
    return { email, firstName, lastName };
}


module.exports = { generateUniqueData };