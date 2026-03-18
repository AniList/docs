---
title: StaffSubmissionUpdateNotification Reference
---

### StaffSubmissionUpdateNotification
Notification for when a staff submission is accepted, partially accepted, or rejected
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="/reference/scalar/int">Int</a>!</td>
<td>
The id of the Notification
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="/reference/enum/notificationtype">NotificationType</a></td>
<td>
The type of notification
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>contexts</strong></td>
<td valign="top">[<a href="/reference/scalar/string">String</a>]</td>
<td>
The notification context text
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="/reference/scalar/string">String</a></td>
<td>
The status of the submission
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notes</strong></td>
<td valign="top"><a href="/reference/scalar/string">String</a></td>
<td>
The notes of the submission
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="/reference/scalar/int">Int</a></td>
<td>
The time the notification was created at
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>staff</strong></td>
<td valign="top"><a href="/reference/object/staff">Staff</a></td>
<td>
The staff that was modified.
</td>
</tr>
</tbody>
</table>