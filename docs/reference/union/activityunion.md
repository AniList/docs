---
title: ActivityUnion Reference
---

### Boolean
The `Boolean` scalar type represents `true` or `false`.
### CountryCode
ISO 3166-1 alpha-2 country code
### Float
The `Float` scalar type represents signed double-precision fractional
values as specified by
[IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).
### FuzzyDateInt
8 digit long date integer (YYYYMMDD). Unknown dates represented by 0. E.g. 2016: 20160000, May 1976: 19760500
### ID
The `ID` scalar type represents a unique identifier, often used to
refetch an object or as key for a cache. The ID type appears in a JSON
response as a String; however, it is not intended to be human-readable.
When expected as an input type, any string (such as `"4"`) or integer
(such as `4`) input value will be accepted as an ID.
### Int
The `Int` scalar type represents non-fractional signed whole numeric
values. Int can represent values between -(2^31) and 2^31 - 1.
### Json
### String
The `String` scalar type represents textual data, represented as UTF-8
character sequences. The String type is most often used by GraphQL to
represent free-form human-readable text.
### ActivityUnion
Activity union type
<table>
<thead>
<tr>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td valign="top"><strong><a href="/reference/object/textactivity">TextActivity</a></strong></td>
<td valign="top">
User text activity
</td>
</tr>
<tr>
<td valign="top"><strong><a href="/reference/object/listactivity">ListActivity</a></strong></td>
<td valign="top">
User list activity (anime & manga updates)
</td>
</tr>
<tr>
<td valign="top"><strong><a href="/reference/object/messageactivity">MessageActivity</a></strong></td>
<td valign="top">
User message activity
</td>
</tr>
</tbody>
</table>