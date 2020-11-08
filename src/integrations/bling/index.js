const axios = require('axios')
const js2xmlparser = require('js2xmlparser');

class Bling {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.URL_BLING,
            timeout: 5000,
        })
        this.key = process.env.KEY_BLING
    }

    async createOrder(order) {
        const orderJSON = {
            cliente: {
                nome: order.person_id.name,
                cpf_cnpj: '',
                ie: '',
                endereco: '',
                bairro: '',
                cep: '',
                cidade: '',
                uf: ''
            },
            volumes: [{
                volume: [{
                    servico: ''
                }]
            }],
            itens: [{
                item: {
                codigo: 1,
                descricao: 'Deal',
                qtde: 1,
                vlr_unit: order.value,
                }
            }],
            parcelas: [{
                parcela: {
                    vlr: order.value
                }
            }]               
        }        
        
        const orderXml = js2xmlparser.parse('pedido', orderJSON) 
                                            .replace(new RegExp( "\\n", "g" ), "")
                                            .replace(/>\s*/g, '>')
                                            .replace(/\s*</g, '<')
                                            .replace(/\<\?xml.+\?\>/g, '')
        try { 
            const result = await this.api.post(`pedido/json/&apikey=${this.key}&xml=${orderXml}`, '')            
            return result.data        
        } catch (error) {
            console.log(error)
            return { error: 'An error ocurred. Try again later. ' + error}
        }
    }
}

module.exports = Bling