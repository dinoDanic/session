defmodule FinstaWeb.HomeLive do
  alias Finsta.Posts
  alias Finsta.Posts.Post

  use FinstaWeb, :live_view

  def render(%{loading: true} = assigns) do
    ~H"""
    Finsta is connecting...
    """
  end

  def render(assigns) do
    ~H"""
    <h1>Finsta</h1>
    <.button phx-click={show_modal("new-post-modal")}>create post</.button>

    <div id="posts" phx-update="stream">
      <div :for={{dom_id, post} <- @streams.posts} id={dom_id} class="w-1/2 mx-auto">
        <p><%= post.user.email %></p>
        <p><%= post.caption %></p>
      </div>
    </div>

    <.modal id="new-post-modal">
      <.simple_form for={@form} phx-submit="save-post">
        <.input field={@form[:caption]} type="textarea" label="caption" required />
        <.button type="submit">create post</.button>
      </.simple_form>
    </.modal>
    """
  end

  def mount(_params, _session, socket) do
    if connected?(socket) do
      Phoenix.PubSub.subscribe(Finsta.PubSub, "posts")

      form =
        %Post{}
        |> Post.changeset(%{})
        |> to_form(as: "post")

      socket =
        socket
        |> assign(form: form, loading: false)
        |> stream(:posts, Posts.list_posts())

      {:ok, socket}
    else
      {:ok, assign(socket, loading: true)}
    end
  end

  def handle_event("validate", _unsigned_params, socket) do
    {:noreply, socket}
  end

  def handle_event("save-post", %{"post" => post_params}, socket) do
    %{current_user: user} = socket.assigns

    post_params
    |> Map.put("user_id", user.id)
    |> Map.put("image_path", "/test/pag")
    |> Posts.save()
    |> case do
      {:ok, post} ->
        socket =
          socket
          |> put_flash(:info, "post create")
          |> push_navigate(to: ~p"/home")

        Phoenix.PubSub.broadcast(Finsta.PubSub, "posts", {:new, Map.put(post, :user, user)})

        {:noreply, socket}

      {:error, changeset} ->
        IO.puts(~c"tu sammmmmmmmmmmm")
        IO.puts(changeset)
        {:noreply, socket}
    end
  end

  def handle_info({:new, post}, socket) do
    socket =
      socket
      |> put_flash(:info, "#{post.user.email}just posted")
      # |> stream(:posts, Posts.list_posts())
      |> stream_insert(:posts, post, at: 0)

    {:noreply, socket}
  end
end
