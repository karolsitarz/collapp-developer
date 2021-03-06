import Head from 'next/head'
import { Layout } from 'layouts/Layout'
import { useRouter } from 'next/router'
import { PluginForm } from 'includes/plugins/components/PluginForm'
import Button from 'shared/components/button/Button'
import { GoChevronLeft } from 'react-icons/go'
import { PluginSizeForm } from 'includes/plugins/components/PluginSizeForm'
import { PluginDeleteForm } from 'includes/plugins/components/PluginDeleteForm'
import { PluginFileForm } from 'includes/plugins/components/PluginFileForm'
import { PluginSubmitForm } from 'includes/plugins/components/PluginSubmitForm'
import { PluginContext } from 'includes/plugins/components/PluginContext'
import Link from 'next/link'
import { useQuery } from 'shared/hooks/useQuery'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { withAuth } from 'shared/hooks/useAuth'
import { ErrorInfo } from 'shared/components/ErrorInfo'
import { LogoSpinner } from 'shared/components/LogoSpinner'

interface LogType {
  id: string
  date: string
  content: string
}

const Plugin = () => {
  const router = useRouter()
  const pathId = String(router.query.id)
  const [isRefetching, setRefetching] = useState(false)
  const { data, error } = useQuery(
    ['plugin', pathId],
    `/api/plugins/${pathId}`,
    {
      refreshInterval: isRefetching ? 3000 : undefined,
    },
  )

  const {
    name,
    description,
    id,
    icon,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    isPending,
    isBuilding,
    source,
    published,
    logs,
  } = data || {}

  useEffect(() => {
    setRefetching(isBuilding)
  }, [isBuilding])

  return (
    <Layout>
      <Head>
        <title>Plugin</title>
      </Head>
      <PluginContext.Provider value={{ id, isPending }}>
        <Button
          color="light"
          onClick={() => router.push('/plugins')}
          className="mb-4"
        >
          <GoChevronLeft className="mr-2 -ml-2" />
          Back
        </Button>
        {!!error && (
          <div className="mt-6">
            <ErrorInfo error={error} />
          </div>
        )}
        {!data && !error && (
          <div className="m-12">
            <LogoSpinner />
          </div>
        )}
        {!!data && !error && (
          <>
            <div className="bg-white px-8 py-8 rounded-3xl shadow-2xl">
              <h1 className="text-xl font-bold text-gray-500 mb-4">
                General info
              </h1>
              <PluginForm initial={{ name, description, icon }} />
            </div>
            <div className="bg-white px-8 py-8 rounded-3xl shadow-2xl mt-8">
              <h1 className="text-xl font-bold text-gray-500 mb-4">
                Plugin size
              </h1>
              <PluginSizeForm
                initial={{ minWidth, maxWidth, minHeight, maxHeight }}
              />
            </div>
            <div className="bg-white px-8 py-8 rounded-3xl shadow-2xl mt-8">
              <h1 className="text-xl font-bold text-gray-500 mb-4">
                Source code
              </h1>
              <PluginFileForm file={source} />
            </div>
            <div className="bg-white px-8 py-8 rounded-3xl shadow-2xl mt-8">
              <h1 className="text-xl font-bold text-gray-500 mb-4">Manage</h1>
              <PluginSubmitForm />

              {!!published && (
                <div className="flex items-center mb-4">
                  <div className="flex-grow flex flex-col mr-2">
                    <h4 className="font-bold text-md">View published</h4>
                    <h6 className="text-sm">
                      Go to the published version of the plugin
                    </h6>
                  </div>
                  <Link href={`/published/${published.id}`} passHref>
                    <Button color="light">View</Button>
                  </Link>
                </div>
              )}

              <PluginDeleteForm name={name} />
            </div>
            <div className="bg-white px-8 py-8 rounded-3xl shadow-2xl mt-8">
              <h1 className="text-xl font-bold text-gray-500 mb-4">Logs</h1>
              <table>
                <thead>
                  <tr>
                    <td className="py-2 px-3 font-bold">Date</td>
                    <td className="py-2 px-3 font-bold">Message</td>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(({ id, date, content }: LogType) => (
                    <tr key={id}>
                      <td className="py-2 px-3 text-sm text-gray-400">
                        {dayjs(date).format('LLL')}
                      </td>
                      <td className="py-2 px-3">{content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </PluginContext.Provider>
    </Layout>
  )
}

export default withAuth(Plugin)
