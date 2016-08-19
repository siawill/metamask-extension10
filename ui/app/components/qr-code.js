const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const connect = require('react-redux').connect
const CopyButton = require('./copyButton')

module.exports = connect(mapStateToProps)(QrCodeView)

function mapStateToProps (state) {
  return {
    Qr: state.appState.Qr,
    buyView: state.appState.buyView,
    warning: state.appState.warning,
  }
}

inherits(QrCodeView, Component)

function QrCodeView () {
  Component.call(this)
}

QrCodeView.prototype.render = function () {
  var props = this.props
  var Qr = props.Qr
  return h('.main-container.flex-column', {
    key: 'qr',
    style: {
      justifyContent: 'center',
      padding: '45px',
      alignItems: 'center',
    },
  }, [
    Array.isArray(Qr.message) ? h('.message-container', this.renderMultiMessage()) : h('h3', Qr.message),

    this.props.warning ? this.props.warning && h('span.error.flex-center', {
      style: {
        textAlign: 'center',
        width: '229px',
        height: '82px',
      },
    },
    this.props.warning) : null,

    h('#qr-container.flex-column', {
      style: {
        marginTop: '25px',
        marginBottom: '15px',
      },
      dangerouslySetInnerHTML: {
        __html: Qr.image,
      },
    }),
    h('.flex-row', [
      h('h3.ellip-address', {
        style: {
          width: '247px',
        },
      }, Qr.data),
      h(CopyButton, {
        value: Qr.data,
      }),
    ]),
  ])
}

QrCodeView.prototype.renderMultiMessage = function () {
  var Qr = this.props.Qr
  var multiMessage = Qr.message.map((message) => h('.qr-message', message))
  return multiMessage
}
