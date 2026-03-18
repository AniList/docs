---
title: MediaSubmissionUpdateNotification Reference
---

### MediaSubmissionUpdateNotification
Notification for when a media submission is accepted, partially accepted, or rejected
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
<td colspan="2" valign="top"><strong>media</strong></td>
<td valign="top"><a href="/reference/object/media">Media</a></td>
<td>
The media that was created or modified. If this submission was to create a new media and it was rejected, this will be null.
</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>submittedTitle</strong></td>
<td valign="top"><a href="/reference/scalar/string">String</a></td>
<td>
The title of the media that was submitted. If this submission was to edit an existing media, this will be null.
</td>
</tr>
</tbody>
</table>