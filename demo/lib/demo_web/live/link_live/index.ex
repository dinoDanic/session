defmodule DemoWeb.LinkLive.Index do
  alias Demo.Links
  use DemoWeb, :live_view

  def mount(_params, _session, socket) do
    user_id = socket.assigns.current_user.id
    changeset = Links.Link.changeset(%Links.Link{})

    socket =
      socket
      |> assign(:links, Links.list_links())
    
      |> assign(
        :form,
        to_form(changeset)
      )

    {:ok, socket}
  end

  def handle_event("submit", %{"link" => link_params}, socket) do
    params =
      link_params
      |> Map.put("user_id", socket.assigns.current_user.id)

    case Links.create_link(params) do
      {:ok, link} ->
        socket =
          socket
          |> put_flash(:info, "link created successfully.")
          |> assign(:links, [link | socket.assigns.links])

        {:noreply, socket}

      {:error, changeset} ->
        socket =
          socket
          |> assign(
            :form,
            to_form(changeset)
          )

        {:noreply, socket}
    end
  end
end
