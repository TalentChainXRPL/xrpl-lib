# A TypeScript Library for XRPL By TalentChain

<h3> <b>TalentChain</b> aims to provide an <i>open source</i> Restful API, to make it easier to access information and interact with the <b><i>XRP ledger</i></b>. </h3>

<br/><br/>

## About TalentChain
### [TalentChain](https://www.talentchain.io) is providing a decentralized exchange that allow users to trade Personal Tokens on XRP ledger.

`Decentralized Exchange` – Access [TalentChain DEX](https://www.talentchain.io/dex/TALENT).

<br/>

 [TalentChain](https://www.talentchain.io) offer opportunities to talented individuals interested in self-monetization by providing access to personal tokens issued on XRP ledger. These personal tokens are available for trading on [TalentChain DEX](https://www.talentchain.io/dex/TALENT), this enable talents to trade services or goods they offer in exchange for their own currency (personal token). [TalentChain](https://www.talentchain.io) aims to provide features like vesting, staking, airdrops, minting NFTs and many more, so talents can grow their community.

<br/>

### How [TalentChain](https://www.talentchain.io) benefits the XRPL Community:

<br/>

<ul>
  <li>Issuing new tokens on the XRP ledger.</li>
  <li>Attracting new users to hold personal tokens issued on the XRP ledger.</li>
  <li>Creating more opportunities for trades on XRP ledger.</li>
  <li>Contributing to the XRP ledger by open sourcing TalentChain code and documentation for XRPL.</li>
  <li>Allowing users to trade on the XRP ledger</li>
  <li>TalentChain aims to launch a live instance of the open source xrpl based library which makes it easier for users to interact with the ledger and grow XRPL information endpoints for public.</li>
</ul>

<br/><br/>

## About TalentChain API

 Under the hood, TalentChain API uses [xrpl JS/TS npm package](https://www.npmjs.com/package/xrpl) and connects to the XRP ledger through websockets using [mainnet](wss://xrplcluster.com) for interacting with the ledger.

 For receiving some information from ledger, the API also utilizes [Ripple Data API v2](https://data.ripple.com/v2/).

<br/>

`TalentChain API` – We aim to launch a live instance of our XRPL TS library at this [link](https://api.talentchain.io) in near future.

<br/><br/>

## API reference

<br/>


### Account Balances

Get all balances of a specific XRP Ledger account.

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /balance
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following <b>query</b> parameters:

| Field     | Value  | Description |
|-----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |

<br/>

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
| `issuer` | String | Address of the account that owns that currency, not applicable to XRP (<i>native asset of XRP ledger</i>) |


<br/><br/>


### Account Balances for specific currency

Get balance of a specific XRP Ledger account for a specific currency.

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /balance/currency
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following <b>query</b> parameters:

| Field     | Value  | Description |
|-----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |
| `currency` | String | Currency code, can either be <i>ISO-4217</i> standard three alphanumeric or 16 digits hexadecimal string. |
| `issuer` | String | Currency issuer address, a valid xrpl account address starting with a lower case "r".|

<br/>

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


<br/><br/>

### Account Orders

Get orders of a specific account, that have not already been filled in the order book.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /order
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |

<br/>

The API returns open orders for all currencies that have been placed the by the specified address.

<br/>

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


<br/><br/>

### Account Orders for specific currency

Get orders for a specific currency in the order book, of a particular address.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /order/currency
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |
| `currency` | String | Currency code. |
| `issuer` | String | Issuer address. |

<br/>

The API returns open orders for all currencies that have been placed the by the specified address.

<br/>

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


<br/><br/>

### Account Orders for specific currency pair

Get orders for a specific currency pair in the order book, of a particular address.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /order/currency-pair
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `address` | String | XRP Ledger address to query. |
| `base` | String | Issuer address followed by + and Currency code for the base currency, e.g; <i>rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq<b>+</b>EUR</i> or <i>xrp</i> for XRP. |
| `counter` | String | Issuer address followed by + and Currency code for the counter currency, e.g; <i>rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67<b>+</b>XAU</i> or <i>xrp</i> for XRP. |

<br/>

The API returns open orders for all currencies that have been placed the by the specified address.

<br/>

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


<br/><br/>

### Market Statistics

Market trade statistics of specified currency pairs for last 24 hours from xrp ledger along with some additional information that isn't offered by other public data endpoints or even the xrpl sdk.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /market
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value  | Description |
|----------|--------|-------------|
| `base` | String | Issuer address followed by + and Currency code for the base currency, e.g; <i>rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq<b>+</b>EUR</i> or <i>xrp</i> for XRP. |
| `counter` | String | Issuer address followed by + and Currency code for the counter currency, e.g; <i>rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67<b>+</b>XAU</i> or <i>xrp</i> for XRP. |

<br/>

The API returns last 24 hour statistics of specified currency pair from xrp ledger.

<br/>

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with the following:

| Field  | Value | Description |
|--------|-------|-------------|
| `market` | Market statistics object | Object containing last 24 hour's market statistics. |

Market stats object has the following fields:

| Field                        | Value                | Description |
|------------------------------|----------------------|-------------|
| `open` | Unsigned number | Open price. |
| `volume` | Unsigned number | Total volume of trades that happened during the last 24 hours. |
| `high` | Unsigned number | Highest price of base currency in all trades that happened during the last 24 hours. |
| `low` | Unsigned number | Lowest price of base currency in all trades that happened during the last 24 hours. |
| `close` | Unsigned number | Price of base currency in the last trade that happened during the last 24 hours. |
| `first` | Unsigned number | Price of base currency in the first trade that happened during the last 24 hours. |
| `change` | Signed number | Numeric signed value for 24 hours change as percentage of base currency. |


<br/><br/>

### Chart Data for trades on XRP ledger.

This API returns tarding data of any currency pair on the XRP ledger for charts along with some additional information that isn't offered by other public data endpoints or even the xrpl sdk.

#### Request Format

<!-- MULTICODE_BLOCK_START -->

*REST*

```
GET /chart
```

<!-- MULTICODE_BLOCK_END -->

This method requires the following Query parameters:

| Field    | Value        | Description |
|----------|--------------|-------------|
| `period` | String | Valid period value |
| `from` | String | Valid date (string / milliseconds) from which to start the chart data till current time. |
| `base` | String | Issuer address followed by + and Currency code for the base currency, e.g; <i>rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq<b>+</b>EUR</i> or <i>xrp</i> for XRP. |
| `counter` | String | Issuer address followed by + and Currency code for the counter currency, e.g; <i>rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67<b>+</b>XAU</i> or <i>xrp</i> for XRP. |

#### Period options

| Field  | Value | Description |
|--------|-------|-------------|
| `1h` | string | For getting chart data chunks base on an interval of 1 hour. |
| `3h` | string | For getting chart data chunks base on an interval of 3 hours. |
| `6h` | string | For getting chart data chunks base on an interval of 6 hours. |
| `12h` | string | For getting chart data chunks base on an interval of 12 hours. |
| `1d` | string | For getting chart data chunks base on an interval of 1 dya. |
| `3d` | string | For getting chart data chunks base on an interval of 3 days. |
| `1w` | string | For getting chart data chunks base on an interval of 1 week. |

<br/>

The API returns last 24 hour statistics of specified currency pair from xrp ledger.

<br/>

#### Response Format
A successful response uses the HTTP code **200 OK** and has a JSON body with the following:

| Field  | Value | Description |
|--------|-------|-------------|
| `chartData` | Array of chart data objects | Object containing chart data fields to be used in the chart. |
| `totalVolume` | Unsigned number | Total volume of the whole chart data. |

<h4>Chart data object has the following fields:</h4>

| Field                        | Value                     | Description |
|------------------------------|---------------------------|-------------|
| `date` | ISO Date time string | Date time for the data. |
| `open` | Unsigned number | Open price in the specific interval based chunk of trading data. |
| `volume` | Unsigned number | Total volume of trades that happened during the interval. |
| `high` | Unsigned number | Highest price of base currency in all trades that happened during the interval. |
| `low` | Unsigned number | Lowest price of base currency in all trades that happened during the interval. |
| `close` | Unsigned number | Price of base currency in the last trade that happened during the interval. |

<br/><br/>

### Work in progress...
