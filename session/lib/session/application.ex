defmodule Session.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      SessionWeb.Telemetry,
      Session.Repo,
      {DNSCluster, query: Application.get_env(:session, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Session.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Session.Finch},
      # Start a worker by calling: Session.Worker.start_link(arg)
      # {Session.Worker, arg},
      # Start to serve requests, typically the last entry
      SessionWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Session.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    SessionWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
