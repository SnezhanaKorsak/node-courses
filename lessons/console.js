function consoleToJSON() {
    const csl = {}

    for(let i = 2; i < process.argv.length; i++) {
      const arg = process.argv[i].split('=')
      csl[arg[0]] = arg[1] || true
    }

 return csl
}

console.log(consoleToJSON())
