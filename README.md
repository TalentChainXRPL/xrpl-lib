# XRPL API By TalentChain

<h3> <b>TalentChain</b> aims to provide an <i>open source</i> Restful API, to make it easier to access information and interact with <b><i>XRP ledger</i></b>. </h3>

<br/><br/>

## About TalentChain
#### [TalentChain](https://www.talentchain.io) offers a decentralized exchange that allow users to trade on XRP ledger.

`Decentralized Exchange` – Access [TalentChain DEX](https://www.talentchain.io/dex/TALENT).

<br/>

#### It also provide opportunities for talented individuals all around the globe to tokenize their skills by providing access to personal tokens issued on XRP ledger.

<br/><br/>

## About API

#### Under the hood, TalentChain API uses [xrpl JS/TS npm package](https://www.npmjs.com/package/xrpl) sending requests to XRP ledger and utilizes [Ripple Data API v2](https://data.ripple.com/v2/) getting information from XRP ledger.

<br/>

#### TalentChain API connects to mainnet of the XRP ledger through websockets using [mainnet](wss://xrplcluster.com)

<br/>

#### `TalentChain API` – Open source API [instance](https://api.talentchain.io)  will be available soon.

<br/><br/>

## API reference

<br/>


### Account Balances

Get all balances of a specific XRP Ledger account.

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /balances
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following query parameters:

| Field     | Value  | Description |
|-----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with an array of objects containing currency, value and if currency is not XRP then an issuer fields.

| Field  | Value | Description |
|--------|-------|-------------|
| `balances` | Array of balance objects | Balance object containing information about the currency and it's amount that the user holds. |

Each balance object has the following fields:

| Field                        | Value  | Description |
|------------------------------|--------|-------------|
| `currency` | String | Currency code that can either be a 3 alphabets long ISO standard currency code or a 16 digit long hexadecimal currency code. |
| `value` | String | Amount of currency that the user holds. |
| `issuer` | String | Address of the account that owns that currency, not applicable to XRP (<i>native token of XRP ledger</i>) |

### Account Balances for specific currency

Get balance of a specific XRP Ledger account for a specific currency.

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /currency-balance
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following query parameters:

| Field     | Value  | Description |
|-----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |
| `currency` | String | Currency code |

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with an array of objects containing currency, value and if currency is not XRP then an issuer fields.

| Field  | Value | Description |
|--------|-------|-------------|
| `balance` | balance Object | Balance object containing information about the currency and it's amount that the user holds. |

Each balance object has the following fields:

| Field                        | Value  | Description |
|------------------------------|--------|-------------|
| `currency` | String | Currency code that can either be a 3 alphabets long ISO standard currency code or a 16 digit long hexadecimal currency code. |
| `value` | String | Amount of currency that the user holds. |
| `issuer` | String | Address of the account that owns that currency, not applicable to XRP (<i>native token of XRP ledger</i>) |



### Account Orders

Get orders of a specific account, that have not already been filled in the order book.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /orders
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |

The API returns open orders for all currencies that have been placed the by the specified address.

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with the following:

| Field  | Value | Description |
|--------|-------|-------------|
| `orders` | Array of order objects | The requested orders. |

Each offer object has the following fields:

| Field                        | Value  | Description |
|------------------------------|--------|-------------|
| `flags` | Unsigned integer | Options set for this offer entry as bit-flags. |
| `seq` | Unsigned integer | Sequence number of the transaction that created this entry. |
| `taker_gets` | String or Object | The amount the account accepting the offer receives, as a String representing an amount in XRP, or a currency object. |
| `taker_pays` | String or Object | The amount the account accepting the offer provides, as a String representing an amount in XRP, or a currency object. |
| `quality` | String | The exchange rate of the offer, as the ratio of the original taker_pays divided by the original taker_gets. |
| `expiration` | Unsigned integer | (May be omitted) A time after which this offer is considered unfunded. |


### Account Orders for specific currency

Get orders for a specific currency in the order book, of a particular address.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /currency-orders
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |
| `currency` | String | Currency code. |
| `issuer` | String | Issuer address. |

The API returns open orders for all currencies that have been placed the by the specified address.

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with the following:

| Field  | Value | Description |
|--------|-------|-------------|
| `orders` | Array of order objects | The requested orders. |

Each offer object has the following fields:

| Field                        | Value  | Description |
|------------------------------|--------|-------------|
| `flags` | Unsigned integer | Options set for this offer entry as bit-flags. |
| `seq` | Unsigned integer | Sequence number of the transaction that created this entry. |
| `taker_gets` | String or Object | The amount the account accepting the offer receives, as a String representing an amount in XRP, or a currency object. |
| `taker_pays` | String or Object | The amount the account accepting the offer provides, as a String representing an amount in XRP, or a currency object. |
| `quality` | String | The exchange rate of the offer, as the ratio of the original taker_pays divided by the original taker_gets. |
| `expiration` | Unsigned integer | (May be omitted) A time after which this offer is considered unfunded. |


### Account Orders for specific currency pair

Get orders for a specific currency pair in the order book, of a particular address.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /currency-pair-orders
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |
| `base` | String | Issuer address followed by + and Currency code for the base currency, e.g; <i>rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq<b>+</b>EUR</i>. |
| `counter` | String | Issuer address followed by + and Currency code for the counter currency, e.g; <i>rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67<b>+</b>XAU</i>. |

The API returns open orders for all currencies that have been placed the by the specified address.

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with the following:

| Field  | Value | Description |
|--------|-------|-------------|
| `orders` | Array of order objects | The requested orders. |

Each offer object has the following fields:

| Field                        | Value  | Description |
|------------------------------|--------|-------------|
| `flags` | Unsigned integer | Options set for this offer entry as bit-flags. |
| `seq` | Unsigned integer | Sequence number of the transaction that created this entry. |
| `taker_gets` | String or Object | The amount the account accepting the offer receives, as a String representing an amount in XRP, or a currency object. |
| `taker_pays` | String or Object | The amount the account accepting the offer provides, as a String representing an amount in XRP, or a currency object. |
| `quality` | String | The exchange rate of the offer, as the ratio of the original taker_pays divided by the original taker_gets. |
| `expiration` | Unsigned integer | (May be omitted) A time after which this offer is considered unfunded. |
