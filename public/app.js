const getCurrency = price => {
  return new Intl.NumberFormat('en-US', {
    currency: 'usd',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = getCurrency(node.textContent)
})

const formatData = date => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
document.querySelectorAll('.date').forEach(node => {
  node.textContent = formatData(node.textContent)
})

const $card = document.querySelector('#card')

if ($card) {
  $card.addEventListener('click', event => {

    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      const csrf = event.target.dataset.csrf

      fetch('/card/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        }
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(item => {
              return `
              <tr>
                    <td>${item.title}</td>
                    <td>${item.count}</td>
                    <td>
                        <button class="btn btn-small red lighten-2 js-remove" data-id="${item.id}">
                            <i class="small material-icons js-remove" data-id="${item.id}">clear</i>
                        </button>
                    </td>
                </tr>
              `
            }).join(' ')

            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').innerHTML = getCurrency(card.price)
          } else {
            $card.innerHTML = '<p>Your cart is empty</p>'
          }
        })
    }
  })
}


M.Tabs.init(document.querySelectorAll('.tabs'));
