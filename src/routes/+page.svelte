<script lang="ts">
	export let data;
</script>

<h1>If you see this page, it means you are logged in</h1>

<p>UserId: {data.userId}</p>
<p>Email: {data.email}</p>

<form method="post" action="?/logout">
	<button type="submit">Logout</button>
</form>
