from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
import json

class ChartAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_candlestick_data(self):
        response = self.client.get(reverse('candlestick_data'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('data', data)
        self.assertIsInstance(data['data'], list)
        self.assertGreater(len(data['data']), 0)
        self.assertIn('x', data['data'][0])
        self.assertIn('open', data['data'][0])
        self.assertIn('high', data['data'][0])
        self.assertIn('low', data['data'][0])
        self.assertIn('close', data['data'][0])

    def test_line_chart_data(self):
        response = self.client.get(reverse('line_chart_data'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('labels', data)
        self.assertIn('data', data)
        self.assertIsInstance(data['labels'], list)
        self.assertIsInstance(data['data'], list)

    def test_bar_chart_data(self):
        response = self.client.get(reverse('bar_chart_data'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('labels', data)
        self.assertIn('data', data)
        self.assertIsInstance(data['labels'], list)
        self.assertIsInstance(data['data'], list)

    def test_pie_chart_data(self):
        response = self.client.get(reverse('pie_chart_data'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('labels', data)
        self.assertIn('data', data)
        self.assertIsInstance(data['labels'], list)
        self.assertIsInstance(data['data'], list)